/**
 * Upstream sources for copied registry components and the site's shadcn UI primitives.
 * Used by validate-registry.ts and gen-provenance.ts.
 */
import type { SourceId } from "../registry/schema";

export interface SourceInfo {
  id: SourceId | "shadcn";
  projectName: string;
  repoUrl: string;
  commit: string;
  copyright: string;
  licenseFile: string; // relative to scripts/licenses/
  licenseFor: string;
}

export const SOURCES: SourceInfo[] = [
  {
    id: "magicui",
    projectName: "Magic UI",
    repoUrl: "https://github.com/magicuidesign/magicui",
    commit: "b0b2e4974b1b68cd5278277c6837a27736e20c3a",
    copyright: "Copyright (c) Magic UI",
    licenseFile: "magicui.txt",
    licenseFor: "registry/ui components copied from Magic UI",
  },
  {
    id: "motion-primitives",
    projectName: "motion-primitives",
    repoUrl: "https://github.com/ibelick/motion-primitives",
    commit: "120f64f6ca60348e251f929e9c81f11ccbe45eda",
    copyright: "Copyright (c) 2024 ibelick",
    licenseFile: "motion-primitives.txt",
    licenseFor: "registry/ui components copied from motion-primitives",
  },
  {
    id: "animata",
    projectName: "Animata",
    repoUrl: "https://github.com/codse/animata",
    commit: "25c27e5a874c60a56dcc1609df3b2c4f5f8456f8",
    copyright: "Copyright (c) Animata",
    licenseFile: "animata.txt",
    licenseFor: "registry/ui components copied from Animata",
  },
  {
    id: "shadcn",
    projectName: "shadcn/ui",
    repoUrl: "https://github.com/shadcn-ui/ui",
    commit: "968d8cb9dc42ae5d52e8fd356cf84596ec832a26",
    copyright: "Copyright (c) 2023 shadcn",
    licenseFile: "shadcn.txt",
    licenseFor: "site UI primitives in components/ui",
  },
];

/**
 * Upstream code inside a registry file that is governed by a license other than
 * the one named in the file's primary SOURCES entry. Rendered as "Additional notices".
 */
export interface AdditionalNotice {
  projectName: string;
  repoUrl: string;
  commit: string;
  copyright: string;
  fileUrl: string;
  appliesTo: string[]; // registry files that contain the derived code
  licenseName: string;
  licenseFile: string; // relative to scripts/licenses/
}

export const ADDITIONAL_NOTICES: AdditionalNotice[] = [
  {
    projectName: "adobe/react-spectrum",
    repoUrl: "https://github.com/adobe/react-spectrum",
    commit: "2ac28d36146c2acd008fc397fbd36535e894a516",
    copyright: "Copyright 2020 Adobe. All rights reserved.",
    fileUrl:
      "https://github.com/adobe/react-spectrum/blob/2ac28d36146c2acd008fc397fbd36535e894a516/packages/react-aria/src/overlays/usePreventScroll.ts",
    appliesTo: ["registry/hooks/usePreventScroll.tsx"],
    licenseName: "Apache License 2.0",
    licenseFile: "react-spectrum-apache-2.0.txt",
  },
];
