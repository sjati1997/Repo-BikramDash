"use server"

import { headers } from "next/headers"

import { organization } from "@/config/organization"
import { buildContactEmail } from "@/lib/contact/email-template"
import { createMemoryRateLimiter } from "@/lib/contact/rate-limit"
import {
  contactFormSchema,
  contactSpamSchema,
  type ContactField,
  type ContactFormResult,
  type ContactFormValues,
  type ContactSpamFields,
} from "@/lib/contact/schema"
import { sendEmail } from "@/lib/email/mailer"
import { getServerEnv } from "@/lib/env.server"

/** Submissions faster than this after the form rendered are treated as bots. */
const MIN_FILL_TIME_MS = 2500

const rateLimiter = createMemoryRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 })

const GENERIC_ERROR =
  "We couldn't send your message right now. Please try again in a few minutes, or contact us directly by email."

async function getClientIp() {
  const requestHeaders = await headers()
  const forwarded = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim()
  return forwarded || requestHeaders.get("x-real-ip")?.trim() || "unknown"
}

export async function submitContactForm(
  values: ContactFormValues,
  spam: ContactSpamFields
): Promise<ContactFormResult> {
  // 1. Validate everything again — the client can't be trusted.
  const parsed = contactFormSchema.safeParse(values)
  const spamParsed = contactSpamSchema.safeParse(spam)

  if (!parsed.success || !spamParsed.success) {
    const fieldErrors: Partial<Record<ContactField, string>> = {}
    for (const issue of parsed.error?.issues ?? []) {
      const field = issue.path[0] as ContactField | undefined
      if (field && !fieldErrors[field]) fieldErrors[field] = issue.message
    }
    return {
      ok: false,
      reason: "validation",
      message: "Please check the highlighted fields and try again.",
      fieldErrors,
    }
  }

  // 2. Spam heuristics. Respond as if successful so bots get no signal.
  const { website, startedAt } = spamParsed.data
  if (website !== "" || Date.now() - startedAt < MIN_FILL_TIME_MS) {
    console.info("[contact] Submission discarded by spam filter")
    return { ok: true }
  }

  // 3. Rate limit per client IP.
  const ip = await getClientIp()
  const limit = rateLimiter.check(ip)
  if (!limit.allowed) {
    const minutes = Math.max(1, Math.ceil(limit.retryAfterSeconds / 60))
    return {
      ok: false,
      reason: "rate_limited",
      message: `You've sent several messages in a short time. Please wait about ${minutes} minute${minutes === 1 ? "" : "s"} before trying again.`,
    }
  }

  // 4. Deliver to the administrator.
  try {
    const { ADMIN_EMAIL } = getServerEnv()
    const email = buildContactEmail({
      values: parsed.data,
      submittedAt: new Date(),
      organizationName: organization.name,
    })

    const { id } = await sendEmail({
      to: ADMIN_EMAIL,
      replyTo: parsed.data.email,
      ...email,
    })

    // Log the provider id only — never the visitor's personal data.
    console.info(`[contact] Submission delivered (email id: ${id})`)
    return { ok: true }
  } catch (error) {
    console.error("[contact] Failed to deliver submission:", error instanceof Error ? error.message : error)
    return { ok: false, reason: "server", message: GENERIC_ERROR }
  }
}
