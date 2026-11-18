import Link from "next/link";
import { DocPage } from "@/components/site/docs/doc-page";
import { DOCS_LINKS } from "@/components/site/docs/links";

export default function DocsIndexPage() {
  return (
    <DocPage title="Docs" description="How MotionKit components are found, copied and maintained.">
      <ul>
        {DOCS_LINKS.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </DocPage>
  );
}
