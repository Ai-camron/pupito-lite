import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";

const newsletterRoutePath = path.join(
  process.cwd(),
  "src",
  "app",
  "api",
  "newsletter",
  "route.ts"
);

test("newsletter API validates email format", async () => {
  const contents = await fs.readFile(newsletterRoutePath, "utf-8");

  assert.match(contents, /const emailRegex =/);
  assert.match(contents, /emailRegex\.test/);
  assert.match(contents, /Please enter a valid email address/);
});

test("newsletter API prevents duplicate signups", async () => {
  const contents = await fs.readFile(newsletterRoutePath, "utf-8");

  assert.match(contents, /emailData\.emails\.includes/);
  assert.match(contents, /Email already subscribed to the Pup Squad!/);
  assert.match(contents, /status: 409/);
});

test("newsletter API stores new signups", async () => {
  const contents = await fs.readFile(newsletterRoutePath, "utf-8");

  assert.match(contents, /emailData\.emails\.push/);
  assert.match(contents, /emailData\.signups\.push/);
});
