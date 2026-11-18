/**
 * Registry import specifiers that the copy-paste view rewrites to the install locations.
 * Only import/export-from/dynamic-import specifiers match; other strings are left alone.
 */
const REGISTRY_IMPORT = /(\bfrom\s*|\bimport\s*\(?\s*)(["'])@\/registry\/(lib\/utils|ui\/[^"'\n]+|hooks\/[^"'\n]+)\2/g;

function installTarget(target: string): string {
  if (target === "lib/utils") return "@/lib/utils";
  if (target.startsWith("ui/")) return `@/components/ui/${target.slice("ui/".length)}`;
  return `@/hooks/${target.slice("hooks/".length)}`;
}

/**
 * Rewrites `@/registry/lib/utils`, `@/registry/ui/X` and `@/registry/hooks/X` import
 * specifiers to `@/lib/utils`, `@/components/ui/X` and `@/hooks/X`.
 */
export function rewriteRegistryImports(code: string): string {
  return code.replace(REGISTRY_IMPORT, (_match, lead: string, quote: string, target: string) => {
    return `${lead}${quote}${installTarget(target)}${quote}`;
  });
}

/** True when a file calls cn or imports the registry cn helper, so lib/utils.ts is needed. */
export function usesCn(code: string): boolean {
  return /\bcn\(/.test(code) || code.includes("@/registry/lib/utils");
}
