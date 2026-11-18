import { DocPage } from "@/components/site/docs/doc-page";

export default function CustomizationPage() {
  return (
    <DocPage
      title="Customization"
      description="Change props, Tailwind classes and demo values. The copied code is yours to edit."
    >
      <h2>Props</h2>
      <p>
        Each component page has a playground with controls. A control maps to a prop of the component, or to a prop of the demo
        wrapper when its label says so. The props shown are the ones the component really accepts. Pass the same values in your
        own code.
      </p>
      <h2>Tailwind classes</h2>
      <p>
        Components that accept a <code>className</code> merge it with their own classes through <code>cn</code>, so your classes
        can override the defaults. Components that use theme colours read them from your own Tailwind theme, so set those in
        your global CSS if you want a different look.
      </p>
      <h2>Editing the code</h2>
      <p>
        Once a file is copied, it is ordinary source in your project. You can change its markup, timings and styles. If you
        change it heavily, keep the upstream copyright notice and license at the top of the file, as described on the{" "}
        <a href="/docs/licensing">Licensing</a> page.
      </p>
      <h2>Playground</h2>
      <p>
        The playground on each component page is a preview. Use it to try values before copying. It does not change the code you
        copy, so write the final values into your own usage.
      </p>
    </DocPage>
  );
}
