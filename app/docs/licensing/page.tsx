import Link from "next/link";
import { DocPage } from "@/components/site/docs/doc-page";

export default function LicensingPage() {
  return (
    <DocPage title="Licensing" description="Which license applies to the site code and to the copied components.">
      <h2>MotionKit site code</h2>
      <p>The code of the MotionKit site, including its pages and layout, is released under the MIT License.</p>
      <h2>Copied components</h2>
      <p>
        Files under <code>registry/ui</code> are copied from other open-source projects. They keep the upstream copyright notice
        and the MIT License. We do not claim authorship of them. The shadcn/ui primitives in <code>components/ui</code> also keep
        their upstream copyright and license.
      </p>
      <p>
        The full license texts, the upstream repositories and the pinned commits are listed on the{" "}
        <Link href="/notices">third-party notices</Link> page. The same content is in <code>THIRD_PARTY_NOTICES.md</code> in
        the repository.
      </p>
      <h2>Using a component</h2>
      <p>
        When you copy a file into your project, keep the upstream copyright notice and MIT License text for that file. The texts
        are on the <Link href="/notices">third-party notices</Link> page. Your own code can use a different license.
      </p>
    </DocPage>
  );
}
