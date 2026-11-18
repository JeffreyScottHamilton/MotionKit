import { describe, expect, it } from "vitest";
import ts from "typescript";
import { defaultValues, fillUsage } from "./usage";
import type { Control } from "@/registry/schema";

/** True when the snippet parses as TSX with no syntax errors. */
function parsesAsTsx(code: string): boolean {
  const { diagnostics } = ts.transpileModule(code, {
    fileName: "usage.tsx",
    reportDiagnostics: true,
    compilerOptions: { jsx: ts.JsxEmit.Preserve },
  });
  return (diagnostics ?? []).length === 0;
}

describe("fillUsage", () => {
  it("inserts numbers as bare literals", () => {
    expect(fillUsage("x={{n}}", { n: 2 })).toBe("x=2");
    expect(fillUsage("x={{n}}", { n: 0.25 })).toBe("x=0.25");
  });

  it("inserts booleans as bare literals", () => {
    expect(fillUsage("x={{b}}", { b: true })).toBe("x=true");
    expect(fillUsage("x={{b}}", { b: false })).toBe("x=false");
  });

  it("inserts the raw string when the token is wrapped in double quotes", () => {
    expect(fillUsage('per="{{per}}"', { per: "word" })).toBe('per="word"');
  });

  it("inserts the raw string when the token is wrapped in single quotes", () => {
    expect(fillUsage("per='{{per}}'", { per: "char" })).toBe("per='char'");
  });

  it("JSON-stringifies a bare string token", () => {
    expect(fillUsage("{{children}}", { children: "Hi there" })).toBe('"Hi there"');
    expect(fillUsage("x={{s}}", { s: 'a"b' })).toBe('x="a\\"b"');
  });

  it("inserts the raw string when the token is JSX text between tags", () => {
    expect(fillUsage("<span>{{initialLabel}}</span>", { initialLabel: "Hi" })).toBe("<span>Hi</span>");
    expect(fillUsage("<TextReveal>{{children}}</TextReveal>", { children: "Hello world" })).toBe(
      "<TextReveal>Hello world</TextReveal>",
    );
  });

  it("treats the token as JSX text when only the opening or closing side is a tag", () => {
    expect(fillUsage("<p>\n  {{children}}\n</p>", { children: "Body" })).toBe("<p>\n  Body\n</p>");
    expect(fillUsage("{{children}} </b>", { children: "x" })).toBe("x </b>");
  });

  it("still JSON-stringifies a string inside a JSX expression container", () => {
    expect(fillUsage("v={ {{s}} }", { s: "abc" })).toBe('v={ "abc" }');
  });

  it("handles the {{{x}}} form by replacing only the inner token", () => {
    expect(fillUsage("v={{{n}}}", { n: 1 })).toBe("v={1}");
    expect(fillUsage("v={{{s}}}", { s: "abc" })).toBe('v={"abc"}');
  });

  it("handles the { {{x}} } form by replacing only the inner token", () => {
    expect(fillUsage("delay={ {{delay}} }", { delay: 0.5 })).toBe("delay={ 0.5 }");
    expect(fillUsage("v={ {{s}} }", { s: "abc" })).toBe('v={ "abc" }');
  });

  it("escapes the surrounding quote char inside a quoted attribute", () => {
    const out = fillUsage('<X per="{{per}}" />', { per: 'a"b' });
    expect(out).toBe('<X per={"a\\"b"} />');
    expect(parsesAsTsx(out)).toBe(true);
  });

  it("escapes a single quote inside a single-quoted attribute", () => {
    const out = fillUsage("<X per='{{per}}' />", { per: "a'b" });
    expect(out).toBe("<X per={\"a'b\"} />");
    expect(parsesAsTsx(out)).toBe(true);
  });

  it("uses an expression for a quoted attribute value containing & (JSX decodes entities)", () => {
    const out = fillUsage('<X title="{{t}}" />', { t: "Tom &amp; Jerry" });
    expect(out).toBe('<X title={"Tom &amp; Jerry"} />');
    expect(parsesAsTsx(out)).toBe(true);
  });

  it("keeps a quoted attribute value raw when it has nothing to escape", () => {
    expect(fillUsage('<X per="{{per}}" />', { per: "word" })).toBe('<X per="word" />');
  });

  it("escapes a value inside a JS string in an expression container", () => {
    const out = fillUsage('<X label={"{{label}}"} />', { label: 'say "hi"' });
    expect(out).toBe('<X label={"say \\"hi\\""} />');
    expect(parsesAsTsx(out)).toBe(true);
  });

  it("wraps JSX text values that contain < > { } or & in an expression", () => {
    for (const value of ["a<b", "a>b", "{x}", "a}b", "Tom & Jerry"]) {
      const out = fillUsage("<span>{{t}}</span>", { t: value });
      expect(out).toBe(`<span>{${JSON.stringify(value)}}</span>`);
      expect(parsesAsTsx(`const el = (${out});`)).toBe(true);
    }
  });

  it("keeps plain JSX text raw", () => {
    expect(fillUsage("<span>{{t}}</span>", { t: "Hello world" })).toBe("<span>Hello world</span>");
  });

  it("keeps a bare string inside a JS expression valid when it contains quotes", () => {
    const out = fillUsage("v={ {{s}} }", { s: 'a"b' });
    expect(out).toBe('v={ "a\\"b" }');
    expect(parsesAsTsx(`const el = <X ${out} />;`)).toBe(true);
  });

  it("leaves tokens for unknown props untouched", () => {
    expect(fillUsage("a={{known}} b={{unknown}}", { known: 1 })).toBe("a=1 b={{unknown}}");
  });
});

describe("defaultValues", () => {
  it("maps each control prop to its default", () => {
    const controls: Control[] = [
      { type: "number", prop: "n", label: "N", min: 0, max: 2, step: 1, default: 1 },
      { type: "boolean", prop: "b", label: "B", default: true },
      { type: "select", prop: "s", label: "S", options: ["a", "b"], default: "b" },
      { type: "text", prop: "t", label: "T", default: "hello" },
      { type: "color", prop: "c", label: "C", default: "#ff0000" },
    ];
    expect(defaultValues(controls)).toEqual({ n: 1, b: true, s: "b", t: "hello", c: "#ff0000" });
  });
});
