import { describe, expect, it } from "vitest";
import { defaultValues, fillUsage } from "./usage";
import type { Control } from "@/registry/schema";

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
