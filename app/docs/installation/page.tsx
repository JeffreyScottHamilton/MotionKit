import Link from "next/link";
import { DocPage } from "@/components/site/docs/doc-page";

export default function InstallationPage() {
  return (
    <DocPage title="Installation" description="Installation is copy-paste. There is no CLI and no npm package to add.">
      <h2>1. Install the dependencies</h2>
      <p>
        Each component page lists the npm packages its file imports, for example <code>motion</code>, <code>clsx</code> or{" "}
        <code>tailwind-merge</code>. Install those packages in your project.
      </p>
      <pre>
        <code>npm install motion clsx tailwind-merge</code>
      </pre>
      <h2>2. Copy the file</h2>
      <p>
        Each component page lists its files under <em>Files</em>, as paths in the MotionKit repository such as{" "}
        <code>registry/ui/&lt;name&gt;.tsx</code>. Copy those files into your project, for example into{" "}
        <code>components/ui</code>. If a component page lists a styles file for its category, copy the keyframes it needs into
        your global CSS.
      </p>
      <h2>3. Adjust the import paths</h2>
      <p>
        The copied files import <code>cn</code> from the MotionKit path <code>@/registry/lib/utils</code>. Point that import at
        a <code>cn</code> helper in your project (it is a small wrapper around <code>clsx</code> and <code>tailwind-merge</code>),
        and fix any relative imports between the copied files.
      </p>
      <h2>Check</h2>
      <p>
        Render the component once to confirm it works. Then read the <Link href="/docs/frameworks">Frameworks</Link> page if
        you use Vite or plain React rather than Next.js.
      </p>
    </DocPage>
  );
}
