"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { AnimatePresence, m } from "framer-motion"
import { AlertCircle, CheckCircle2, ChevronDown, Loader2, Send } from "lucide-react"
import { useEffect, useId, useRef, useState } from "react"
import { useForm, useWatch, type UseFormRegisterReturn } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { organization } from "@/config/organization"
import { submitContactForm } from "@/lib/contact/actions"
import {
  CONTACT_LIMITS,
  contactFormDefaults,
  contactFormSchema,
  type ContactField,
  type ContactFormInput,
  type ContactFormValues,
} from "@/lib/contact/schema"
import { cn } from "@/lib/utils"

type Status = { type: "idle" } | { type: "success" } | { type: "error"; message: string }

const NETWORK_ERROR =
  "We couldn't reach the server. Please check your internet connection and try again."

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ type: "idle" })
  const startedAt = useRef(0)
  const honeypotRef = useRef<HTMLInputElement>(null)
  const inFlight = useRef(false)

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setFocus,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInput, unknown, ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: contactFormDefaults,
    mode: "onTouched",
  })

  useEffect(() => {
    startedAt.current = Date.now()
  }, [])

  const messageLength = useWatch({ control, name: "message" })?.length ?? 0

  const submit = async (values: ContactFormValues) => {
    if (inFlight.current) return // guards against double submission
    inFlight.current = true
    setStatus({ type: "idle" })

    try {
      const result = await submitContactForm(values, {
        website: honeypotRef.current?.value ?? "",
        startedAt: startedAt.current,
      })

      if (result.ok) {
        reset(contactFormDefaults)
        setStatus({ type: "success" })
        return
      }

      const fieldEntries = Object.entries(result.fieldErrors ?? {}) as Array<[ContactField, string]>
      for (const [field, message] of fieldEntries) setError(field, { type: "server", message })
      if (fieldEntries[0]) setFocus(fieldEntries[0][0])
      setStatus({ type: "error", message: result.message })
    } catch {
      setStatus({ type: "error", message: NETWORK_ERROR })
    } finally {
      inFlight.current = false
    }
  }

  const startOver = () => {
    startedAt.current = Date.now()
    setStatus({ type: "idle" })
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {status.type === "success" ? (
          <m.div
            key="success"
            // Move focus to the confirmation once it mounts so screen readers announce it.
            ref={(node: HTMLDivElement | null) => node?.focus({ preventScroll: true })}
            tabIndex={-1}
            role="status"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex min-h-[28rem] flex-col items-start justify-center outline-none"
          >
            <span className="inline-flex size-12 items-center justify-center rounded-leaf-sm bg-brand text-highlight">
              <CheckCircle2 className="size-6" aria-hidden="true" />
            </span>
            <h3 className="mt-6 font-heading text-2xl font-bold text-foreground">Thank you — message sent.</h3>
            <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">
              We&apos;ve received your message. Our team will review it and reply to the email address you
              provided.
            </p>
            <Button variant="outline" className="mt-8" onClick={startOver}>
              Send another message
            </Button>
          </m.div>
        ) : (
          <m.form
            key="form"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            onSubmit={(event) => handleSubmit(submit)(event)}
            noValidate
            aria-describedby="contact-form-note"
            className="grid gap-x-8 gap-y-7 sm:grid-cols-2"
          >
            <Field label="Name" required error={errors.name?.message} registration={register("name")} autoComplete="name" maxLength={CONTACT_LIMITS.name} />
            <Field
              label="Email"
              required
              type="email"
              inputMode="email"
              error={errors.email?.message}
              registration={register("email")}
              autoComplete="email"
              maxLength={CONTACT_LIMITS.email}
            />
            <Field
              label="Phone"
              type="tel"
              inputMode="tel"
              error={errors.phone?.message}
              registration={register("phone")}
              autoComplete="tel"
              maxLength={CONTACT_LIMITS.phone}
            />
            <Field
              label="What can we help you with?"
              required
              error={errors.topic?.message}
              registration={register("topic")}
              options={organization.contactSection.topics}
            />

            <Field
              label="Message"
              required
              multiline
              placeholder="Tell us what you're looking for, such as the service you're interested in, your background, or the roles you need to fill."
              className="sm:col-span-2"
              error={errors.message?.message}
              registration={register("message")}
              maxLength={CONTACT_LIMITS.message}
              hint={`${messageLength.toLocaleString("en-US")} / ${CONTACT_LIMITS.message.toLocaleString("en-US")}`}
            />

            {/* Honeypot: invisible to people and assistive tech, tempting to bots. */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor="contact-website">Website</label>
              <input ref={honeypotRef} id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
            </div>

            <div className="sm:col-span-2" aria-live="polite">
              {status.type === "error" && (
                <div role="alert" className="flex items-start gap-3 border-l-2 border-destructive bg-destructive/5 p-4 text-sm text-foreground">
                  <AlertCircle className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden="true" />
                  <p>{status.message}</p>
                </div>
              )}
            </div>

            <div className="flex flex-col-reverse gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <p id="contact-form-note" className="text-xs text-muted-foreground">
                Fields marked <span aria-hidden="true">*</span>
                <span className="sr-only">with an asterisk</span> are required. Your details are only used to respond to
                your enquiry. Please don&apos;t include identity documents or passwords.
              </p>
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                aria-disabled={isSubmitting}
                className="group shrink-0 bg-brand text-brand-foreground hover:bg-brand-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 data-icon="inline-start" className="animate-spin" aria-hidden="true" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send message
                    <Send
                      data-icon="inline-end"
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </>
                )}
              </Button>
            </div>
          </m.form>
        )}
      </AnimatePresence>
    </div>
  )
}

type FieldProps = {
  label: string
  registration: UseFormRegisterReturn
  error?: string
  required?: boolean
  multiline?: boolean
  hint?: string
  placeholder?: string
  /** Renders a native select with these options instead of a text input. */
  options?: readonly string[]
  className?: string
} & Pick<React.ComponentProps<"input">, "type" | "inputMode" | "autoComplete" | "maxLength">

function Field({ label, registration, error, required, multiline, hint, placeholder, options, className, ...inputProps }: FieldProps) {
  const id = useId()
  const errorId = `${id}-error`
  const hintId = `${id}-hint`
  const describedBy = [error && errorId, hint && hintId].filter(Boolean).join(" ") || undefined

  const shared = {
    id,
    "aria-invalid": error ? true : undefined,
    "aria-required": required || undefined,
    "aria-describedby": describedBy,
    ...registration,
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-baseline justify-between gap-4">
        <Label htmlFor={id} className="text-muted-foreground">
          {label}
          {required && (
            <span aria-hidden="true" className="text-brand">
              *
            </span>
          )}
        </Label>
        {hint && (
          <span id={hintId} className="text-xs text-muted-foreground tabular-nums">
            {hint}
          </span>
        )}
      </div>
      {options ? (
        <div className="relative">
          <select
            {...shared}
            className="h-10 w-full appearance-none border border-transparent border-b-input bg-transparent pr-8 text-base transition-[color,border-color] outline-none focus-visible:border-b-ring aria-invalid:border-b-destructive"
          >
            <option value="" disabled>
              Select an option
            </option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ChevronDown
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-0 size-4 -translate-y-1/2 text-muted-foreground"
          />
        </div>
      ) : multiline ? (
        <Textarea {...shared} placeholder={placeholder} maxLength={inputProps.maxLength} rows={5} className="min-h-36 text-base" />
      ) : (
        <Input {...shared} {...inputProps} className="text-base" />
      )}
      {error && (
        <p id={errorId} className="flex items-center gap-1.5 text-sm text-destructive">
          <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}
