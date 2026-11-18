# Contributing to MotionKit

Thanks for helping. This guide covers the development setup, how to add a component, the license policy and the checks to run before you open a pull request.

Please follow the [Code of Conduct](./CODE_OF_CONDUCT.md).

## Development setup

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

## Adding a component

A component is added in these steps. Use an existing component of the same category as a template.

1. **Source file** `registry/ui/<id>.tsx`. Start the file with a header comment in the same format as `registry/ui/text-shimmer.tsx`:

   ```tsx
   /**
    * Text Shimmer — from motion-primitives (https://github.com/ibelick/motion-primitives/blob/<commit>/components/core/text-shimmer.tsx)
    * Original author: ibelick. License: MIT. Copyright (c) 2024 ibelick. Licensed under the MIT License.
    * Modified: <list every change, or write "Unmodified">.
    */
   ```

   The URL must be pinned to a commit, not a branch. Keep the upstream copyright notice and license line.
2. **Entry** `registry/entries/<id>.ts`. Export an `entry` of type `RegistryEntry` from `registry/schema.ts`. Fill in `source` (project, pinned `fileUrl` and `commit`, author, license, notice, and a `modified` note), `reducedMotion`, `controls` and `usage`.
3. **Demo** `registry/demos/<id>.tsx`. It must be a client component (`"use client"`) that exports a default function.
4. **Aggregators.** Add the entry to `registry/entries/_<category>.ts` and the demo to `registry/demos/_<category>.ts`. Categories are `text`, `buttons`, `layout`, `loading` and `visual`.
5. **Keyframes.** If the component needs CSS keyframes or theme animations, add them to `registry/styles/<category>.css`, with a comment naming the source.
6. **Provenance.** Run `npm run gen:provenance`. It regenerates `provenance.json` and `THIRD_PARTY_NOTICES.md`. Commit both generated files with your change.

Shared hooks go in `registry/hooks/` and need the same header treatment.

## License policy

- Only licenses that clearly allow redistribution are accepted, for example MIT, ISC, BSD-2-Clause, BSD-3-Clause or Apache-2.0. Apache-2.0 code needs its notice kept in `THIRD_PARTY_NOTICES.md`.
- The license must be verified from the source repository. A license that cannot be verified is not accepted.
- Sources with restrictive terms are not accepted. Currently excluded: React Bits (its Commons Clause forbids redistributing the components), GSAP (proprietary no-charge license), and Aceternity UI and Hover.dev (license not verified).
- A source URL pinned to a commit is required.
- Keep the upstream copyright notices in each file.
- Record every modification in the header comment and in the entry's `source.modified` field.
- Write an original component only when no permissive source exists for it.

## Checks before a pull request

Run these from the repository root. All must pass:

```bash
npm run lint
npm run typecheck
npm run test
npm run validate:registry
npm run build
```

If you changed a registry source or a notice, also run `npm run gen:provenance` and make sure `provenance.json` and `THIRD_PARTY_NOTICES.md` are up to date. CI fails when they differ from the generated output. End-to-end tests (`npm run e2e`) are run in CI.

## Commits and pull requests

- Keep each commit focused on one change. Use a short imperative subject line, for example `Add text-scramble component`.
- Describe in the pull request what changed, why, and where the source comes from.
- Fill in the pull request template. It asks for the source URL and commit, the verified license, the notices, the recorded modifications, the passing checks and how reduced motion is handled.
- To suggest a component without writing code, open a "Component submission" issue.
