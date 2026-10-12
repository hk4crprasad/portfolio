export type ContactValues = { name: string; email: string; message: string };
export type ContactErrors = Partial<Record<keyof ContactValues, string>>;
export const contactLimits = { name: 80, email: 254, message: 1500 };

export function validateContact(
  values: ContactValues,
  quick = false,
): ContactErrors {
  const errors: ContactErrors = {};
  if (
    !quick &&
    (!values.name.trim() ||
      values.name.length > contactLimits.name ||
      Array.from(values.name).some((character) => character.charCodeAt(0) < 32))
  ) {
    errors.name = "Enter your name (up to 80 characters).";
  }
  if (
    !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(values.email.trim()) ||
    values.email.length > contactLimits.email
  ) {
    errors.email = "Enter a valid email address (up to 254 characters).";
  }
  if (
    !quick &&
    (!values.message.trim() ||
      values.message.length > contactLimits.message ||
      Array.from(values.message).some(
        (character) =>
          character.charCodeAt(0) < 32 &&
          !["\t", "\n", "\r"].includes(character),
      ))
  ) {
    errors.message = "Enter a message (up to 1,500 characters).";
  }
  return errors;
}

export function createEmailDraft(
  recipient: string,
  values: ContactValues,
  quick = false,
) {
  if (Object.keys(validateContact(values, quick)).length)
    throw new Error("Invalid contact details");
  const subject = quick
    ? "A quick hello from your portfolio"
    : `Portfolio enquiry from ${values.name.trim()}`;
  const body = quick
    ? `Hi Haraprasad,\n\nYou can reply to me at ${values.email.trim()}.\n\n`
    : `From: ${values.name.trim()}\nEmail: ${values.email.trim()}\n\n${values.message.trim()}`;
  return {
    subject,
    body,
    href: `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
  };
}
