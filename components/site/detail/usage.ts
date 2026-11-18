import type { Control } from "@/registry/schema";

export type ControlValue = string | number | boolean;

const TOKEN = /\{\{(\w+)\}\}/g;

/**
 * Fills {{prop}} tokens in a usage template with value literals.
 * - number/boolean: String(value)
 * - string: raw text when the token sits inside a quoted attribute (" or '),
 *   or as JSX text (nearest non-space char before is ">" or after is "<");
 *   otherwise a JSON string literal.
 * - unknown prop: the token is left as-is.
 * Only the inner token is replaced, so {{{x}}} and { {{x}} } keep their wrappers.
 */
export function fillUsage(template: string, values: Record<string, ControlValue>): string {
  return template.replace(TOKEN, (token, prop: string, offset: number, whole: string) => {
    if (!Object.prototype.hasOwnProperty.call(values, prop)) return token;
    const value = values[prop];
    if (typeof value !== "string") return String(value);
    const before = offset > 0 ? whole.charAt(offset - 1) : "";
    if (before === '"' || before === "'") return value;
    const end = offset + token.length;
    const prevSignificant = whole.slice(0, offset).trimEnd().slice(-1);
    const nextSignificant = whole.slice(end).trimStart().charAt(0);
    if (prevSignificant === ">" || nextSignificant === "<") return value;
    return JSON.stringify(value);
  });
}

/** Maps every control prop to its default value. */
export function defaultValues(controls: Control[]): Record<string, ControlValue> {
  const out: Record<string, ControlValue> = {};
  for (const control of controls) {
    out[control.prop] = control.default;
  }
  return out;
}
