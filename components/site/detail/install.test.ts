import { describe, expect, it } from "vitest";
import { rewriteRegistryImports, usesCn } from "./install";

describe("rewriteRegistryImports", () => {
  it("rewrites the cn helper import to @/lib/utils", () => {
    expect(rewriteRegistryImports('import { cn } from "@/registry/lib/utils";')).toBe(
      'import { cn } from "@/lib/utils";',
    );
  });

  it("rewrites sibling ui imports to @/components/ui", () => {
    expect(rewriteRegistryImports('import { Button } from "@/registry/ui/button";')).toBe(
      'import { Button } from "@/components/ui/button";',
    );
  });

  it("rewrites hook imports to @/hooks and keeps the quote style", () => {
    expect(rewriteRegistryImports("import useClickOutside from '@/registry/hooks/useClickOutside';")).toBe(
      "import useClickOutside from '@/hooks/useClickOutside';",
    );
  });

  it("rewrites multi-line imports, type imports, side-effect and dynamic imports", () => {
    const code = [
      "import {",
      "  A,",
      '} from "@/registry/ui/accordion";',
      'import type { B } from "@/registry/ui/disclosure";',
      'import "@/registry/ui/spotlight";',
      'const m = import("@/registry/ui/tilt");',
    ].join("\n");
    expect(rewriteRegistryImports(code)).toBe(
      [
        "import {",
        "  A,",
        '} from "@/components/ui/accordion";',
        'import type { B } from "@/components/ui/disclosure";',
        'import "@/components/ui/spotlight";',
        'const m = import("@/components/ui/tilt");',
      ].join("\n"),
    );
  });

  it("leaves other specifiers alone", () => {
    const code = [
      'import { Control } from "@/registry/schema";',
      'import { x } from "@/registry/demos";',
      'import { cn } from "@/lib/utils";',
      'import { Button } from "@/components/ui/button";',
      'import { motion } from "motion/react";',
    ].join("\n");
    expect(rewriteRegistryImports(code)).toBe(code);
  });

  it("leaves registry paths that are not in import position alone", () => {
    const code = 'const path = "@/registry/lib/utils";\n// see "@/registry/ui/button"';
    expect(rewriteRegistryImports(code)).toBe(code);
  });
});

describe("usesCn", () => {
  it("is true when the file calls cn", () => {
    expect(usesCn('return <div className={cn("a")} />;')).toBe(true);
  });

  it("is true when the file imports the registry cn helper", () => {
    expect(usesCn('import { cn } from "@/registry/lib/utils";')).toBe(true);
  });

  it("is false when the file does not use cn", () => {
    expect(usesCn("export const x = 1;")).toBe(false);
  });
});
