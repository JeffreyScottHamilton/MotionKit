import { DocPage } from "@/components/site/docs/doc-page";

const REPO_URL = "https://github.com/jeffreyscotthamilton/motionkit";

export default function ContributingPage() {
  return (
    <DocPage title="Contributing" description="How to suggest or submit a component for MotionKit.">
      <h2>How to submit</h2>
      <p>
        Open a GitHub issue or pull request in the <a href={REPO_URL} target="_blank" rel="noopener noreferrer">MotionKit repository</a>.
        Include the source URL of the component, pinned to a commit where possible, and the license of the source project.
      </p>
      <h2>Licenses we accept</h2>
      <ul>
        <li>Only permissive licenses that allow redistribution, such as MIT, with the upstream copyright notice kept.</li>
        <li>The source license must be verified from the source repository. A license we cannot verify is not accepted.</li>
      </ul>
      <h2>What we exclude</h2>
      <ul>
        <li>
          React Bits. Its Commons Clause forbids redistributing the components, so none of its code is included.
        </li>
        <li>Code based on GSAP, which is not included.</li>
        <li>Components from sources whose license is unverified.</li>
      </ul>
      <h2>What we check</h2>
      <p>
        Each accepted component gets a registry entry with its source project, pinned source link, author, license and a
        factual description. Entries that cannot be filled in from the source are not added.
      </p>
    </DocPage>
  );
}
