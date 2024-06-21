import Handlebars from "handlebars";
import fs from "node:fs/promises";
import path from "node:path";

const readTemplate = async (filename: string) =>
  fs.readFile(path.join(__dirname, "templates", filename + ".html.hbs"), {
    encoding: "utf8",
  });

const readMany = (folder: string, files: string[]) =>
  Promise.all(files.map((s) => path.join(folder, s)).map(readTemplate));

async function main() {
  const indexTmpl = await readTemplate("index").then((x) =>
    Handlebars.compile(x),
  );
  const [about, experiences, skills] = await readMany("sections", [
    "about",
    "experiences",
    "skills",
  ]);
  await fs.writeFile(
    path.join(__dirname, "..", "index.html"),
    indexTmpl({ about, experiences, skills }),
  );
}

main();
