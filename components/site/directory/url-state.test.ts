import { describe, expect, it } from "vitest";
import { reconcilePendingWrites } from "./url-state";

describe("reconcilePendingWrites", () => {
  it("treats the URL matching a pending write as our own echo and consumes up to it", () => {
    expect(reconcilePendingWrites(["q=a", "q=ab"], "q=a")).toEqual({ isEcho: true, pending: ["q=ab"] });
    expect(reconcilePendingWrites(["q=a", "q=ab"], "q=ab")).toEqual({ isEcho: true, pending: [] });
  });

  it("reports an external change and clears pending writes when the URL matches none of them", () => {
    expect(reconcilePendingWrites(["q=a"], "q=zzz")).toEqual({ isEcho: false, pending: [] });
    expect(reconcilePendingWrites([], "")).toEqual({ isEcho: false, pending: [] });
  });
});
