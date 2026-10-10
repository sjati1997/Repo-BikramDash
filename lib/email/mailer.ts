import "server-only"

import { Resend } from "resend"

import { getServerEnv } from "@/lib/env.server"

/**
 * Email provider boundary. Business logic depends only on `sendEmail` and the
 * `EmailMessage` shape, so the provider (Resend today) can be swapped for SMTP
 * or another service by changing this file alone.
 */

export type EmailMessage = {
  to: string | string[]
  subject: string
  html: string
  text: string
  replyTo?: string
}

export class EmailDeliveryError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options)
    this.name = "EmailDeliveryError"
  }
}

let client: Resend | undefined

function getClient() {
  client ??= new Resend(getServerEnv().RESEND_API_KEY)
  return client
}

export async function sendEmail(message: EmailMessage): Promise<{ id: string }> {
  const { CONTACT_FROM_EMAIL } = getServerEnv()

  const { data, error } = await getClient().emails.send({
    from: CONTACT_FROM_EMAIL,
    to: message.to,
    subject: message.subject,
    html: message.html,
    text: message.text,
    replyTo: message.replyTo,
  })

  if (error || !data) {
    throw new EmailDeliveryError(
      `Email provider rejected the message (${error?.name ?? "unknown"}: ${error?.message ?? "no response"})`
    )
  }

  return { id: data.id }
}
