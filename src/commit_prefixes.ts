const commit_prefixes: Array<{ prefix: string; purpose: string }> = [
  { prefix: "feat", purpose: "A new feature" },
  { prefix: "fix", purpose: "A bug fix" },
  { prefix: "docs", purpose: "Documentation changes only" },
  {
    prefix: "style",
    purpose: "Code style changes (e.g., formatting, missing semicolons)",
  },
  {
    prefix: "refactor",
    purpose: "Code change that neither fixes a bug nor adds a feature",
  },
  { prefix: "perf", purpose: "Performance improvements" },
  { prefix: "test", purpose: "Adding or updating tests" },
  {
    prefix: "chore",
    purpose: "Other changes that don’t modify src or test files",
  },
  { prefix: "build", purpose: "Changes to build system or dependencies" },
  { prefix: "ci", purpose: "CI/CD configuration or script changes" },
  { prefix: "revert", purpose: "Reverts a previous commit" },
  { prefix: "ui", purpose: "UI-related changes" },
];
const prefix_gap = Math.max(
  ...commit_prefixes.map(({ prefix }) => prefix.length),
);
const gap_filler = (m: number) =>
  Array(prefix_gap - m + 1)
    .fill(" ")
    .join("");

export { commit_prefixes, gap_filler };
