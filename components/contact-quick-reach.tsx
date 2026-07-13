"use client";

import { useState } from "react";
import CurvedInput from "./curved-input";
import { profile } from "@/data/portfolio";

export function ContactQuickReach() {
  const [message, setMessage] = useState("");

  function handleSubmit(email: string) {
    if (!email) return;
    const subject = encodeURIComponent("A quick hello from your portfolio");
    const body = encodeURIComponent(`Hi Haraprasad,\n\nYou can reply to me at ${email}.\n\n`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }

  return (
    <div className="quick-reach">
      <p className="eyebrow">Prefer a shorter hello?</p>
      <CurvedInput
        value={message}
        onChange={setMessage}
        onSubmit={handleSubmit}
        placeholder="your@email.com"
        buttonText="Say hello"
        type="email"
        ariaLabel="Your email address"
        theme="dark"
        bend={18}
        height={62}
        width="100%"
        fontSize={15}
        backgroundColor="#10172d"
        borderColor="#394665"
        buttonColor="#c7f46d"
        buttonTextColor="#10172d"
        shadowSize="none"
      />
    </div>
  );
}
