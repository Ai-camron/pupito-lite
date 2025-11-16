import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const componentPath = path.resolve(__dirname, '../src/components/ShopShowcase.tsx');
const componentSource = readFileSync(componentPath, 'utf8');

const sectionsMatch = componentSource.match(/export const SHOP_SECTIONS\s*=\s*\[(.*?)\];/s);
const faqMatch = componentSource.match(/export const SHOP_FAQ\s*=\s*\[(.*?)\];/s);

const sectionBlock = sectionsMatch?.[1] ?? '';
const faqBlock = faqMatch?.[1] ?? '';

const expectedQuestions = [
  'How fast is shipping?',
  'What is your return policy?',
  'How does sizing run?',
  'Do you have a loyalty program?',
];

test('shop sections include faq anchor', () => {
  assert.ok(
    /id:\s*["']faq["']/.test(sectionBlock),
    'Expected SHOP_SECTIONS to include a faq anchor id'
  );
});

test('shop FAQ lists all questions', () => {
  expectedQuestions.forEach((question) => {
    assert.ok(
      faqBlock.includes(question),
      `Expected SHOP_FAQ to include question: ${question}`
    );
  });
});
