"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { profile } from "@/data/portfolio";
import { StarBorder } from "./star-border";
import { Magnet } from "./magnet";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    const subject = encodeURIComponent(`Portfolio enquiry from ${name || "a new connection"}`);
    const body = encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`);

    setSent(true);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>
        <span>Your name</span>
        <input name="name" type="text" required placeholder="How should I know you?" />
      </label>
      <label>
        <span>Email address</span>
        <input name="email" type="email" required placeholder="you@company.com" />
      </label>
      <label>
        <span>What&apos;s on your mind?</span>
        <textarea name="message" required rows={5} placeholder="A problem worth thinking through, perhaps?" />
      </label>
      <Magnet padding={45} magnetStrength={22}>
        <StarBorder as="button" type="submit" color="#c7f46d" speed="5s" className="form-star-action">
          {sent ? <Check size={17} /> : <>Write the email <ArrowUpRight size={17} /></>}
        </StarBorder>
      </Magnet>
      <p className="form-note">This opens your email app with a ready-to-send message.</p>
    </form>
  );
}
