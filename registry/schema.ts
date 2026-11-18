export type Category = "text" | "buttons" | "layout" | "loading" | "visual";
export type SourceId = "magicui" | "motion-primitives" | "animata";
export type Complexity = "simple" | "moderate" | "advanced";
export type AnimationType = "entrance" | "hover" | "press" | "scroll" | "loop" | "state" | "pointer" | "layout";

export type Control =
  | { type: "number"; prop: string; label: string; min: number; max: number; step: number; default: number }
  | { type: "select"; prop: string; label: string; options: string[]; default: string }
  | { type: "text"; prop: string; label: string; default: string }
  | { type: "boolean"; prop: string; label: string; default: boolean }
  | { type: "color"; prop: string; label: string; default: string };

export interface RegistryEntry {
  id: string;                 // kebab-case, equals file names
  name: string;
  description: string;        // one factual sentence
  category: Category;
  tags: string[];
  animationType: AnimationType[];
  complexity: Complexity;
  source: {
    project: SourceId;
    projectName: string;      // "Magic UI" | "motion-primitives" | "Animata"
    repoUrl: string;
    fileUrl: string;          // pinned to commit
    commit: string;
    author: string;
    license: "MIT";
    notice: string;           // e.g. "Copyright (c) Magic UI. Licensed under the MIT License."
    modified: string;         // "Unmodified" or short description of our changes
  };
  dependencies: string[];     // npm packages the copied file imports (e.g. ["motion","clsx","tailwind-merge"])
  files: string[];            // repo-relative, e.g. ["registry/ui/word-rotate.tsx"] (+ hooks it needs)
  installation: "copy";       // copy the file(s)
  frameworks: ("next" | "react")[];
  reducedMotion: string;      // factual: what happens under prefers-reduced-motion
  controls: Control[];        // only props that really exist on the component (or on its demo wrapper — say so in label)
  usage: string;              // usage example code; may contain {{prop}} placeholders filled from controls
  addedAt: string;            // ISO date "2026-11-18"
  featured?: boolean;
}

const CATEGORIES: readonly string[] = ["text", "buttons", "layout", "loading", "visual"];
const SOURCES: readonly string[] = ["magicui", "motion-primitives", "animata"];
const COMPLEXITIES: readonly string[] = ["simple", "moderate", "advanced"];
const ANIMATION_TYPES: readonly string[] = ["entrance", "hover", "press", "scroll", "loop", "state", "pointer", "layout"];
const FRAMEWORKS: readonly string[] = ["next", "react"];
const ID_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function validateControl(control: unknown, index: number): string[] {
  const where = `controls[${index}]`;
  if (typeof control !== "object" || control === null) {
    return [`${where} must be an object`];
  }
  const c = control as Record<string, unknown>;
  const problems: string[] = [];
  if (!isNonEmptyString(c.prop)) problems.push(`${where}.prop is required`);
  if (!isNonEmptyString(c.label)) problems.push(`${where}.label is required`);
  switch (c.type) {
    case "number":
      if (typeof c.min !== "number" || typeof c.max !== "number" || typeof c.step !== "number" || typeof c.default !== "number") {
        problems.push(`${where} (number) needs numeric min, max, step, default`);
      } else if (c.min > c.max) {
        problems.push(`${where} (number) min must be <= max`);
      } else if (c.default < c.min || c.default > c.max) {
        problems.push(`${where} (number) default must be within [min, max]`);
      }
      break;
    case "select":
      if (!isStringArray(c.options) || c.options.length === 0) {
        problems.push(`${where} (select) needs non-empty string options`);
      } else if (typeof c.default !== "string" || !c.options.includes(c.default)) {
        problems.push(`${where} (select) default must be one of options`);
      }
      break;
    case "text":
    case "color":
      if (typeof c.default !== "string") problems.push(`${where} (${c.type}) default must be a string`);
      break;
    case "boolean":
      if (typeof c.default !== "boolean") problems.push(`${where} (boolean) default must be a boolean`);
      break;
    default:
      problems.push(`${where}.type must be one of number, select, text, boolean, color`);
  }
  return problems;
}

/** Returns a list of problems with the entry; an empty array means the entry is valid. */
export function validateEntry(e: RegistryEntry): string[] {
  const problems: string[] = [];
  const entry = e as unknown as Record<string, unknown>;

  if (!isNonEmptyString(e.id) || !ID_PATTERN.test(e.id)) problems.push("id must be kebab-case");
  if (!isNonEmptyString(e.name)) problems.push("name is required");
  if (!isNonEmptyString(e.description)) problems.push("description is required");
  if (!CATEGORIES.includes(e.category)) problems.push(`category must be one of ${CATEGORIES.join(", ")}`);
  if (!isStringArray(e.tags)) problems.push("tags must be a string array");
  if (!Array.isArray(e.animationType) || e.animationType.length === 0 || !e.animationType.every((t) => ANIMATION_TYPES.includes(t))) {
    problems.push(`animationType must be a non-empty array of ${ANIMATION_TYPES.join(", ")}`);
  }
  if (!COMPLEXITIES.includes(e.complexity)) problems.push(`complexity must be one of ${COMPLEXITIES.join(", ")}`);

  const source = entry.source as Record<string, unknown> | undefined;
  if (typeof source !== "object" || source === null) {
    problems.push("source is required");
  } else {
    if (!SOURCES.includes(source.project as string)) problems.push(`source.project must be one of ${SOURCES.join(", ")}`);
    if (!isNonEmptyString(source.projectName)) problems.push("source.projectName is required");
    if (!isNonEmptyString(source.repoUrl)) problems.push("source.repoUrl is required");
    if (!isNonEmptyString(source.fileUrl)) problems.push("source.fileUrl is required");
    if (!isNonEmptyString(source.commit)) problems.push("source.commit is required");
    if (!isNonEmptyString(source.author)) problems.push("source.author is required");
    if (source.license !== "MIT") problems.push('source.license must be "MIT"');
    if (!isNonEmptyString(source.notice)) problems.push("source.notice is required");
    if (!isNonEmptyString(source.modified)) problems.push("source.modified is required");
  }

  if (!isStringArray(e.dependencies)) problems.push("dependencies must be a string array");
  if (!isStringArray(e.files) || e.files.length === 0) problems.push("files must be a non-empty string array");
  if (e.installation !== "copy") problems.push('installation must be "copy"');
  if (!Array.isArray(e.frameworks) || e.frameworks.length === 0 || !e.frameworks.every((f) => FRAMEWORKS.includes(f))) {
    problems.push(`frameworks must be a non-empty array of ${FRAMEWORKS.join(", ")}`);
  }
  if (!isNonEmptyString(e.reducedMotion)) problems.push("reducedMotion is required");
  if (!Array.isArray(e.controls)) {
    problems.push("controls must be an array");
  } else {
    e.controls.forEach((control, index) => problems.push(...validateControl(control, index)));
  }
  if (typeof e.usage !== "string") problems.push("usage must be a string");
  if (typeof e.addedAt !== "string" || !DATE_PATTERN.test(e.addedAt)) problems.push("addedAt must be an ISO date (YYYY-MM-DD)");
  if (e.featured !== undefined && typeof e.featured !== "boolean") problems.push("featured must be a boolean when set");

  return problems;
}
