import Link from "next/link";
import { DocPage } from "@/components/site/docs/doc-page";

export default function AccessibilityPage() {
  return (
    <DocPage title="Accessibility" description="Reduced motion, keyboard and focus notes for the components.">
      <h2>Reduced motion</h2>
      <p>
        Each component page states what happens when a visitor has <code>prefers-reduced-motion</code> set. Some components
        have a guard that turns motion off or shortens it. Where a component has no guard, its page says so. Read that note
        before you use a component in a product where motion sensitivity matters.
      </p>
      <h2>Keyboard and focus</h2>
      <p>
        Interactive components are built on real <code>button</code>, <code>a</code> and form elements where possible. Their
        page notes any keyboard behaviour that is specific to the component, such as how a dialog or tabs trap or move focus.
        Check that focus stays visible in your own theme, because the copied code keeps the focus styles it ships with.
      </p>
      <h2>Labels and content</h2>
      <p>
        Animated text is still text. If a component changes or rearranges words, make sure the content is available to
        assistive technology in its final form. Icon-only controls need an accessible name, and you should add one where the
        copied code does not.
      </p>
      <h2>Reporting a problem</h2>
      <p>
        If you find an accessibility problem in a component, open an issue in the GitHub repository with the component name and
        the browser and assistive technology you used. See <Link href="/docs/contributing">Contributing</Link> for how issues and
        pull requests are handled.
      </p>
    </DocPage>
  );
}
