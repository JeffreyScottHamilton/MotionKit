# MotionKit

The best of motion, in one place.

MotionKit is a directory of animated React components for Next.js and React projects. Each component is copied from an open-source project, keeps its upstream license and copyright notice, and comes with a short description, a usage example and a live demo on the site.

There are no accounts, no backend, no API routes and no environment variables. Installation is copy-paste: there is no CLI and no npm package.

## Sources

| Project | License | Link |
| --- | --- | --- |
| Magic UI | MIT | https://github.com/magicuidesign/magicui |
| motion-primitives | MIT | https://github.com/ibelick/motion-primitives |
| Animata | MIT | https://github.com/codse/animata |

Pinned commits for each source are listed in `scripts/sources.ts` and in `THIRD_PARTY_NOTICES.md`. The site UI primitives in `components/ui` are copied from shadcn/ui (MIT).

### Excluded sources

- **React Bits**: MIT, but its Commons Clause forbids redistributing the components.
- **GSAP**: proprietary license that does not allow free redistribution.
- **Aceternity UI** and **Hover.dev**: license not verified.

## Using a component

1. Open the component page on the site and check its license and source.
2. Copy the files listed under the component's `files` entry (for example `registry/ui/<id>.tsx`, plus any hooks it needs) into your project.
3. Install the npm packages listed in its dependencies (for example `motion`, `clsx`, `tailwind-merge`).
4. Change the `@/registry/lib/utils` import to match your project's `cn` helper, if needed.
5. Keep the upstream copyright notice and license text in each copied file.

## Local development

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Starts the Next.js dev server. |
| `npm run build` | Builds the site for production. |
| `npm run start` | Serves the production build on port 3100. |
| `npm run lint` | Runs ESLint. |
| `npm run typecheck` | Runs `tsc --noEmit`. |
| `npm run test` | Runs the Vitest unit tests. |
| `npm run validate:registry` | Checks every registry entry against the schema and source rules. |
| `npm run gen:provenance` | Regenerates `provenance.json` and the notices in `THIRD_PARTY_NOTICES.md`. |
| `npm run e2e` | Runs the Playwright end-to-end tests. |

## Project structure

- `app/`: Next.js App Router pages (the site and its docs).
- `components/site/`: site layout, docs pages and directory UI.
- `components/ui/`: shadcn/ui primitives used by the site.
- `registry/`: the component catalogue.
  - `registry/entries/`: one metadata file per component, plus category aggregators.
  - `registry/ui/`: the copied component source files.
  - `registry/demos/`: demo wrappers rendered on the site.
  - `registry/hooks/`: hooks used by components.
  - `registry/styles/`: keyframes per category.
- `scripts/`: registry validation, provenance generation and source definitions.
- `e2e/`: Playwright tests.

## Deploying to Vercel

1. Import this repository in Vercel.
2. Keep the framework preset set to Next.js.
3. Use the build command `npm run build`.
4. No environment variables are needed.
5. Use Node.js 20 or newer.

The site is built as static pages (SSG), so no server functions are required.

## Licensing

The MotionKit site code is released under the MIT License. See [LICENSE](./LICENSE).

Copied components keep the license and copyright of their upstream projects. See [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md) for the full license texts, repositories and pinned commits.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the development setup, how to add a component, the license policy and the checks to run before opening a pull request. Participation is governed by the [Code of Conduct](./CODE_OF_CONDUCT.md).
