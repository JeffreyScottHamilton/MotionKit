import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { RegistryEntry } from "@/registry/schema";
import provenanceData from "@/provenance.json";
import { NoticesMarkdown } from "@/components/site/docs/notices-markdown";

type ProvenanceRow = {
  id: string;
  name: string;
  source: RegistryEntry["source"];
  dependencies: string[];
  files: string[];
};

const provenance = provenanceData as ProvenanceRow[];

export default function NoticesPage() {
  const markdown = readFileSync(join(process.cwd(), "THIRD_PARTY_NOTICES.md"), "utf8");

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Third-party notices</h1>
        <p className="text-muted-foreground">
          Components copied from other open-source projects keep their upstream copyright and MIT license. The table lists
          each copied component with its original file.
        </p>
      </header>

      <section aria-labelledby="provenance-heading" className="flex flex-col gap-4">
        <h2 id="provenance-heading" className="text-xl font-semibold tracking-tight">
          Components
        </h2>
        {provenance.length === 0 ? (
          <p className="text-sm text-muted-foreground">No copied components yet.</p>
        ) : (
          <div className="overflow-hidden rounded-md border border-border">
            <table className="w-full table-fixed text-left text-sm">
              <thead className="bg-muted">
                <tr>
                  <th scope="col" className="px-3 py-2 font-medium">
                    Component
                  </th>
                  <th scope="col" className="px-3 py-2 font-medium">
                    Source project
                  </th>
                  <th scope="col" className="px-3 py-2 font-medium">
                    Original file
                  </th>
                  <th scope="col" className="px-3 py-2 font-medium">
                    Author
                  </th>
                  <th scope="col" className="px-3 py-2 font-medium">
                    License
                  </th>
                </tr>
              </thead>
              <tbody>
                {provenance.map((row) => (
                  <tr key={row.id} className="border-t border-border align-top">
                    <td className="break-words px-3 py-2">{row.name}</td>
                    <td className="break-words px-3 py-2">{row.source.projectName}</td>
                    <td className="break-all px-3 py-2">
                      <a
                        href={row.source.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                      >
                        {row.source.fileUrl}
                      </a>
                    </td>
                    <td className="break-words px-3 py-2">{row.source.author}</td>
                    <td className="break-words px-3 py-2">{row.source.license}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section aria-labelledby="full-notices-heading" className="flex flex-col gap-4">
        <h2 id="full-notices-heading" className="text-xl font-semibold tracking-tight">
          License texts
        </h2>
        <NoticesMarkdown markdown={markdown} />
      </section>
    </div>
  );
}
