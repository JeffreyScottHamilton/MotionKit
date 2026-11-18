# Known limitations

- **Copy-paste only.** MotionKit has no CLI and no npm package. Components are copied into your project by hand.
- **Import paths.** Copied files import `cn` from `@/registry/lib/utils`. Change that import to match your project's helper.
- **Reduced motion varies.** How each component behaves under `prefers-reduced-motion` differs. See the reduced-motion note on each component page.
- **No animated drawer or parallax component yet.** No source with an approved license has been imported for these.
- **Aceternity UI and Hover.dev are not included.** Their license has not been verified.
- **Demos are client-only.** Demos are rendered with `ssr:false`, so they appear after the page loads in the browser.
- **Upstream lint warnings.** Some upstream code is kept as-is and triggers lint warnings (no errors): `cursor.tsx`, `magnetic.tsx` and `text-scramble.tsx` (`react-hooks/exhaustive-deps`), and `text-effect.tsx` (unused variable).
