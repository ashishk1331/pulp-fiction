import { $, ShellError } from "bun";

async function get_diff_files(): Promise<string[]> {
  try {
    const files = await $`git diff --name-only`.text();
    const filenames = files
      .split("\n")
      .filter(Boolean)
      .filter((filename) => filename.includes("."));

    if (filenames.length < 1) {
      return [];
    }

    return ["All", ...filenames];
  } catch (err: unknown) {
    if (err instanceof ShellError) {
      console.log(`Failed with code: ${err.exitCode}`);
      console.log(err.stdout.toString());
      console.log(err.stderr.toString());
    } else {
      console.log("Unable to fetch diff file contents.");
    }
  }
  return [];
}

async function get_diff_contents(filenames: string[]): Promise<string> {
  let contents = "";
  try {
    for (const file of filenames) {
      if (file === "All") continue;
      const diff = await $`git diff --cached ${file}`.text();
      contents += "\n\n" + diff;
    }
  } catch (err: unknown) {
    if (err instanceof ShellError) {
      console.log(`Failed with code: ${err.exitCode}`);
      console.log(err.stdout.toString());
      console.log(err.stderr.toString());
    } else {
      console.log("Unable to fetch diff file contents.");
    }
  }
  return contents;
}

export { get_diff_files, get_diff_contents };
