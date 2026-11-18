import Link from "next/link";
import { DocPage } from "@/components/site/docs/doc-page";

export default function GettingStartedPage() {
  return (
    <DocPage
      title="Getting started"
      description="Find a component, read its page, and copy it into your own project."
    >
      <h2>There is no package to install</h2>
      <p>
        MotionKit is a collection of component source files, not an npm package. You browse the{" "}
        <Link href="/components">components</Link>, open a component page, and copy the listed file into your project. No
        account is needed.
      </p>
      <h2>Steps</h2>
      <ol>
        <li>Open the component you want from the <Link href="/components">components</Link> list.</li>
        <li>Check the frameworks, dependencies and reduced-motion notes on that page.</li>
        <li>Install the listed dependencies in your project.</li>
        <li>Copy the listed file, then adjust the import paths. The full steps are in <Link href="/docs/installation">Installation</Link>.</li>
      </ol>
      <h2>Next</h2>
      <p>
        Check which stack each component supports on the <Link href="/docs/frameworks">Frameworks</Link> page, and how to
        adjust props and classes on the <Link href="/docs/customization">Customization</Link> page.
      </p>
    </DocPage>
  );
}
