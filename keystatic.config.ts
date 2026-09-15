import { config } from "@keystatic/core";

// Spike config — deliberately no collections/singletons yet.
// Step 1 is just proving the GitHub-mode OAuth round-trip works on
// Cloudflare Pages + Astro 5 before wiring up real content (see
// ~/.claude/plans/peppy-finding-orbit.md).
export default config({
  storage: {
    kind: "github",
    repo: "Geek96/zhiyuan.dev",
  },
  collections: {},
});
