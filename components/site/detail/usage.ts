import type { Control } from "@/registry/schema";

export type ControlValue = string | number | boolean;

// A quoted token ("{{x}}" or '{{x}}') is matched whole so its quotes can be replaced.
const TOKEN = /(["'])\{\{(\w+)\}\}\1|\{\{(\w+)\}\}/g;

/** Characters that would change meaning if a string were inserted raw into JSX text. */
const JSX_TEXT_UNSAFE = /[{}<>&]/;

/**
 * Fills {{prop}} tokens in a usage template with value literals.
 * - number/boolean: String(value)
 * - string in a quoted attribute ("{{x}}" after `=`): raw text when it is safe; otherwise
 *   the whole token becomes {"..."} (JSON string literal, escaped).
 * - string in a JS string inside an expression ({"{{x}}"}): raw when safe, otherwise the
 *   whole quoted token becomes a JSON string literal.
 * - string as JSX text (nearest non-space char before is ">" or after is "<"): raw when it
 *   has no { } < > &, otherwise {"..."}.
 * - any other string: a JSON string literal.
 * - unknown prop: the token is left as-is.
 * Only the inner token is replaced, so {{{x}}} and { {{x}} } keep their wrappers.
 */
export function fillUsage(template: string, values: Record<string, ControlValue>): string {
  return template.replace(
    TOKEN,
    (token, quote: string | undefined, quotedProp: string | undefined, bareProp: string | undefined, offset: number, whole: string) => {
      const prop = quotedProp ?? bareProp ?? "";
      if (!Object.prototype.hasOwnProperty.call(values, prop)) return token;
      const value = values[prop];
      if (typeof value !== "string") return String(value);
      if (quote !== undefined) return fillQuoted(quote, value, whole.slice(0, offset));
      return fillBare(value, whole, offset, token);
    },
  );
}

function fillQuoted(quote: string, value: string, before: string): string {
  const inAttribute = before.trimEnd().endsWith("=");
  const unsafe = inAttribute
    ? value.includes(quote) || value.includes("&")
    : value.includes(quote) || /[\\\r\n]/.test(value);
  if (!unsafe) return `${quote}${value}${quote}`;
  return inAttribute ? `{${JSON.stringify(value)}}` : JSON.stringify(value);
}

function fillBare(value: string, whole: string, offset: number, token: string): string {
  const before = offset > 0 ? whole.charAt(offset - 1) : "";
  // Partly quoted token (e.g. "{{x}}abc"): keep the historical raw insertion.
  if (before === '"' || before === "'") return value;
  const end = offset + token.length;
  const prevSignificant = whole.slice(0, offset).trimEnd().slice(-1);
  const nextSignificant = whole.slice(end).trimStart().charAt(0);
  if (prevSignificant === ">" || nextSignificant === "<") {
    return JSX_TEXT_UNSAFE.test(value) ? `{${JSON.stringify(value)}}` : value;
  }
  return JSON.stringify(value);
}

/** Maps every control prop to its default value. */
export function defaultValues(controls: Control[]): Record<string, ControlValue> {
  const out: Record<string, ControlValue> = {};
  for (const control of controls) {
    out[control.prop] = control.default;
  }
  return out;
}
