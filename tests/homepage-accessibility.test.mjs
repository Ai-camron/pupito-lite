import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";

const homepagePath = path.join(
  process.cwd(),
  "src",
  "components",
  "PupitoHomepage.tsx"
);

test("newsletter signup input includes accessible labeling", async () => {
  const contents = await fs.readFile(homepagePath, "utf-8");

  assert.match(contents, /type="email"/);
  assert.match(contents, /aria-label="Email address"/);
});

test("chat launcher includes an aria-label", async () => {
  const contents = await fs.readFile(homepagePath, "utf-8");

  assert.match(contents, /aria-label="Open PupiBot chat"/);
});

test("all homepage images include alt text", async () => {
  const contents = await fs.readFile(homepagePath, "utf-8");
  const imageCount = (contents.match(/<Image/g) ?? []).length;
  const altCount = (contents.match(/\balt=/g) ?? []).length;

  assert.ok(
    altCount >= imageCount,
    `Expected at least ${imageCount} alt attributes, found ${altCount}.`
  );
});
