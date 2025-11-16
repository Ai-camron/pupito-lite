import test from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";

const componentPath = path.join(process.cwd(), "src", "components", "ShopShowcase.tsx");
const source = fs.readFileSync(componentPath, "utf8");

const LOOKBOOK_ALT_TEXT = [
  "Two friends in neon streetwear on a rooftop at night",
  "Model wearing anime tee beside retro arcade cabinets",
  "Hooded jacket glowing under rain-soaked city lights",
];

test("includes lookbook section id", () => {
  assert.ok(source.includes('id="lookbook"'), "Expected lookbook section id to be present in markup");
});

test("includes alt text for each lookbook entry", () => {
  LOOKBOOK_ALT_TEXT.forEach((alt) => {
    assert.ok(source.includes(alt), `Expected to find alt text: ${alt}`);
  });
});
