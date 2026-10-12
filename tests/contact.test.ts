import { test } from "node:test";
import assert from "node:assert/strict";
import { createEmailDraft, validateContact } from "../lib/contact";
const valid = {
  name: "Ada & Noor",
  email: "ada@example.com",
  message: "Hello!\nLet’s build <script>alert(1)</script> & test.",
};
test("required, malformed and oversized drafts are rejected", () => {
  assert.deepEqual(
    Object.keys(validateContact({ name: " ", email: "bad", message: " " })),
    ["name", "email", "message"],
  );
  assert.equal(
    Object.keys(
      validateContact({
        name: "a".repeat(81),
        email: "a".repeat(255) + "@example.com",
        message: "a".repeat(1501),
      }),
    ).length,
    3,
  );
  assert.ok(
    validateContact({
      ...valid,
      email: "a@example.com\r\nBcc: attacker@example.com",
    }).email,
  );
  assert.ok(validateContact({ ...valid, name: "Ada\nBcc: injected" }).name);
  assert.throws(() =>
    createEmailDraft("recipient@example.com", { ...valid, email: "invalid" }),
  );
});
test("mailto parameters encode untrusted content without injecting headers", () => {
  const draft = createEmailDraft("recipient@example.com", valid);
  const url = new URL(draft.href);
  assert.equal(
    url.searchParams.get("subject"),
    "Portfolio enquiry from Ada & Noor",
  );
  assert.equal(url.searchParams.get("body"), draft.body);
  assert.equal([...url.searchParams.keys()].join(","), "subject,body");
  assert.ok(!draft.href.includes("<script>"));
});
test("quick draft validates only email and preserves the existing reply workflow", () => {
  const values = { name: "", email: " ada@example.com ", message: "" };
  assert.deepEqual(validateContact(values, true), {});
  assert.ok(
    createEmailDraft("recipient@example.com", values, true).body.includes(
      "ada@example.com",
    ),
  );
  assert.ok(validateContact({ ...values, email: "" }, true).email);
});
