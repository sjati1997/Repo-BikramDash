import { z } from "zod"

import { organization } from "@/config/organization"

/**
 * Shared contact form schema — used by React Hook Form on the client and
 * re-validated by the Server Action. Limits double as oversized-payload guards.
 */

export const CONTACT_LIMITS = {
  name: 100,
  email: 254,
  phone: 30,
  message: 5000,
} as const

// Single-line fields must never contain line breaks (prevents header injection
// if a value ever ends up in an email header such as the subject line).
const SINGLE_LINE = /^[^\r\n]*$/
const PHONE = /^\+?[0-9\s().-]{6,}$/

const TOPIC_ERROR = "Please choose what we can help you with."

const singleLine = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Please keep this under ${max} characters.`)
    .regex(SINGLE_LINE, "Line breaks are not allowed here.")

export const contactFormSchema = z.object({
  name: singleLine(CONTACT_LIMITS.name).min(2, "Please enter your name."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .max(CONTACT_LIMITS.email, "This email address is too long.")
    .pipe(z.email("Please enter a valid email address.")),
  phone: singleLine(CONTACT_LIMITS.phone).refine(
    (value) => value === "" || PHONE.test(value),
    "Please enter a valid phone number."
  ),
  // Input may be "" (nothing selected yet); output must be one of the configured topics.
  topic: z
    .union([z.literal(""), z.enum(organization.contactSection.topics)], { error: TOPIC_ERROR })
    .pipe(z.enum(organization.contactSection.topics, { error: TOPIC_ERROR })),
  message: z
    .string()
    .trim()
    .min(10, "Please write a message of at least 10 characters.")
    .max(CONTACT_LIMITS.message, `Please keep your message under ${CONTACT_LIMITS.message} characters.`),
})

export type ContactFormValues = z.output<typeof contactFormSchema>
/** Form state before validation — the topic starts unselected. */
export type ContactFormInput = z.input<typeof contactFormSchema>
export type ContactField = keyof ContactFormValues

export const contactFormDefaults: ContactFormInput = {
  name: "",
  email: "",
  phone: "",
  topic: "",
  message: "",
}

/** Anti-spam fields sent alongside the form values. */
export const contactSpamSchema = z.object({
  /** Honeypot — hidden from people, filled in by naive bots. */
  website: z.string().max(200).optional().default(""),
  /** Timestamp (ms) when the form was first rendered on the client. */
  startedAt: z.number().int().nonnegative(),
})

export type ContactSpamFields = z.input<typeof contactSpamSchema>

export type ContactFormResult =
  | { ok: true }
  | {
      ok: false
      reason: "validation" | "rate_limited" | "server"
      message: string
      fieldErrors?: Partial<Record<ContactField, string>>
    }
