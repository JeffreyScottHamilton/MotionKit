import Link from "next/link";
import { DocPage } from "@/components/site/docs/doc-page";

export default function FrameworksPage() {
  return (
    <DocPage
      title="Frameworks"
      description="Requirements for Next.js App Router projects and for plain React projects such as Vite."
    >
      <h2>Requirements</h2>
      <ul>
        <li>motion v12 (the components import from <code>motion/react</code>).</li>
        <li>Tailwind CSS v4.</li>
        <li>A <code>cn</code> helper built from <code>clsx</code> and <code>tailwind-merge</code>.</li>
      </ul>
      <h2>Next.js (App Router)</h2>
      <p>
        Components that use React hooks or browser APIs are client components. Their copied file starts with{" "}
        <code>&quot;use client&quot;</code>. Keep that directive when you copy the file, and import the component from a client
        component or from a page that is already a client component.
      </p>
      <h2>Plain React (Vite and others)</h2>
      <p>
        Remove the <code>&quot;use client&quot;</code> line if your project has no server components. Leaving it in is harmless.
        Make sure Tailwind v4 and the <code>cn</code> helper are set up before you copy a component.
      </p>
      <h2>Per component</h2>
      <p>
        Each component page lists the frameworks it supports. Check it before you copy, for example in the{" "}
        <Link href="/components">components</Link> list.
      </p>
    </DocPage>
  );
}
