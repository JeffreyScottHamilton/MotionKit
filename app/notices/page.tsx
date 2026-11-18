export default function NoticesPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold tracking-tight">Third-party notices</h1>
      <p className="text-muted-foreground">
        Components copied from other open-source projects keep their upstream copyright and MIT license. The full license
        texts and source commits are listed in THIRD_PARTY_NOTICES.md in the repository.
      </p>
    </div>
  );
}
