import "server-only"

import { z } from "zod"

const serverEnvSchema = z.object({
  RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY is required"),
  ADMIN_EMAIL: z.email("ADMIN_EMAIL must be a valid email address"),
  /**
   * Sender address. Must belong to a domain verified in Resend, e.g.
   * "Website <no-reply@your-domain.com>". Defaults to Resend's test sender.
   */
  CONTACT_FROM_EMAIL: z.string().min(1).default("Website Contact Form <onboarding@resend.dev>"),
})

export type ServerEnv = z.infer<typeof serverEnvSchema>

let cached: ServerEnv | undefined

/**
 * Reads and validates server-only configuration lazily, so a missing variable
 * fails the contact request (with a logged reason) instead of the whole build.
 */
export function getServerEnv(): ServerEnv {
  if (cached) return cached

  const parsed = serverEnvSchema.safeParse({
    RESEND_API_KEY: process.env.RESEND_API_KEY?.trim() || undefined,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL?.trim() || undefined,
    CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL?.trim() || undefined,
  })

  if (!parsed.success) {
    const problems = parsed.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    throw new Error(`Invalid server environment configuration — ${problems.join("; ")}`)
  }

  cached = parsed.data
  return cached
}
