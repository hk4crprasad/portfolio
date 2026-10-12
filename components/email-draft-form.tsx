"use client";

import Link from "next/link";
import { ArrowUpRight, Copy } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { profile } from "@/data/portfolio";
import { MotionButton } from "./motion-actions";
import {
  contactLimits,
  createEmailDraft,
  validateContact,
  type ContactErrors,
  type ContactValues,
} from "@/lib/contact";

export function EmailDraftForm({ quick = false }: { quick?: boolean }) {
  const [values, setValues] = useState<ContactValues>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [draft, setDraft] = useState<ReturnType<typeof createEmailDraft>>();
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const lock = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const prefix = quick ? "quick" : "contact";

  function update(field: keyof ContactValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setDraft(undefined);
    setStatus("");
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (lock.current) return;
    const nextErrors = validateContact(values, quick);
    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      formRef.current
        ?.querySelector<HTMLInputElement>(`[name="${firstError}"]`)
        ?.focus();
      return;
    }
    lock.current = true;
    setBusy(true);
    const prepared = createEmailDraft(profile.email, values, quick);
    setDraft(prepared);
    setStatus(
      "Draft prepared. Complete and send it in your email app. Nothing has been sent by this website.",
    );
    // A mailto handoff has no delivery callback. Always keep a visible fallback.
    try {
      window.open(prepared.href, "_blank", "noopener,noreferrer");
    } catch {
      setStatus(
        "Your email app could not be opened. Copy the draft below and email it directly.",
      );
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }

  async function copyDraft() {
    if (!draft || lock.current) return;
    lock.current = true;
    setBusy(true);
    try {
      await navigator.clipboard.writeText(
        `To: ${profile.email}\nSubject: ${draft.subject}\n\n${draft.body}`,
      );
      setStatus("Draft copied. Paste it into your email app to send.");
    } catch {
      setStatus(
        "Copy is unavailable. Select the draft text below and copy it, then email it directly.",
      );
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }

  const fields = (
    quick ? ["email"] : ["name", "email", "message"]
  ) as (keyof ContactValues)[];
  return (
    <form
      ref={formRef}
      className={quick ? "quick-reach" : "contact-form"}
      onSubmit={submit}
      noValidate
      aria-label={quick ? "Quick email draft" : "Contact email draft"}
    >
      {quick && <p className="eyebrow">Prefer a shorter hello?</p>}
      {fields.map((field) => {
        const common = {
          id: `${prefix}-${field}`,
          name: field,
          required: true,
          value: values[field],
          maxLength: contactLimits[field],
          "aria-invalid": Boolean(errors[field]),
          "aria-describedby": errors[field]
            ? `${prefix}-${field}-error`
            : `${prefix}-note`,
          onChange: (
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
          ) => update(field, event.target.value),
        };
        return (
          <div className="form-field" key={field}>
            <label htmlFor={common.id}>
              {field === "name"
                ? "Your name"
                : field === "email"
                  ? "Email address"
                  : "What’s on your mind?"}
            </label>
            {field === "message" ? (
              <textarea
                {...common}
                rows={5}
                placeholder="Tell me about your idea or question."
              />
            ) : (
              <input
                {...common}
                type={field === "email" ? "email" : "text"}
                autoComplete={field === "email" ? "email" : "name"}
                placeholder={
                  field === "email" ? "you@company.com" : "Your name"
                }
              />
            )}
            {errors[field] && (
              <p className="field-error" id={`${prefix}-${field}-error`}>
                {errors[field]}
              </p>
            )}
          </div>
        );
      })}
      <MotionButton
        className="button button-dark"
        type="submit"
        disabled={busy || Boolean(draft)}
      >
        {busy
          ? "Preparing…"
          : draft
            ? "Draft prepared"
            : quick
              ? "Say hello"
              : "Prepare email"}
        <ArrowUpRight size={17} aria-hidden="true" />
      </MotionButton>
      <p className="form-note" id={`${prefix}-note`}>
        Opens your email app. Details stay in this browser until you send the
        email. <Link href="/privacy">Privacy details</Link>.
      </p>
      <p className="form-status" role="status" aria-live="polite">
        {status}
      </p>
      {draft && (
        <div className="draft-fallback">
          <p>
            Email app didn’t open? Send to{" "}
            <a href={`mailto:${profile.email}`}>{profile.email}</a>.
          </p>
          <label htmlFor={`${prefix}-draft`}>Your prepared draft</label>
          <textarea
            id={`${prefix}-draft`}
            readOnly
            rows={5}
            value={`Subject: ${draft.subject}\n\n${draft.body}`}
          />
          <button
            className="button button-ghost"
            type="button"
            disabled={busy}
            onClick={copyDraft}
          >
            <Copy size={16} aria-hidden="true" />
            Copy draft
          </button>
        </div>
      )}
    </form>
  );
}
