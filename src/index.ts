import * as p from "@clack/prompts";
import color from "picocolors";
import { setTimeout } from "timers/promises";
import { commit_prefixes, gap_filler } from "./commit_prefixes";
import { get_diff_files, get_diff_contents } from "./git_actions";
// import { promptIt } from "./ai_actions";

const displayText = (text: string) => color.greenBright(text);

// await promptIt();

function onCancel(message?: string) {
  p.cancel(message ? message : "Operation cancelled.");
  process.exit(0);
}

async function Timeout(message: string) {
  const s = p.spinner();
  s.start("Processing...");
  await setTimeout(1000);
  s.stop(message);
}

async function main() {
  p.intro(displayText("🥑 pulp-ficiton"));

  const stagedFiles = await get_diff_files();

  if (stagedFiles.length < 1) {
    return onCancel("No file found.");
  }

  await get_diff_contents(stagedFiles);

  const selected = await p.multiselect({
    message: "Pick files to analyze:",
    options: stagedFiles.map((f) => ({
      value: f,
      label: f,
    })),
    initialValues: ["All"],
  });

  if (Array.isArray(selected) && selected[0] === "All") {
    console.log(stagedFiles.slice(1));
  }

  if (p.isCancel(selected)) {
    return onCancel();
  }

  const category = await p.multiselect({
    message: "Choose a category for the changes:",
    options: commit_prefixes.map(({ prefix, purpose }) => ({
      value: prefix,
      label: `${prefix + gap_filler(prefix.length)} ${purpose}`,
    })),
    initialValues: [commit_prefixes[0].prefix],
  });

  if (p.isCancel(category)) {
    return onCancel();
  }

  const message = await p.text({
    message: "Please enter a summary for this change",
    initialValue: "",
    validate: (value) => {
      if (!value) return "Write something about the changes first.";
    },
  });

  if (p.isCancel(message)) {
    return onCancel();
  }

  await Timeout("Done.");

  p.outro(displayText("✅ Written successfully!"));
}

main().catch(console.error);
