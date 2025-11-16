import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import path from 'node:path'

const shopComponentPath = path.resolve('src/components/ShopShowcase.tsx')
const source = readFileSync(shopComponentPath, 'utf8')

test('shop hero includes accessible heading and call to actions', () => {
  assert.match(source, /id="shop-hero"/, 'hero heading should expose an id for aria-labelledby')
  assert.match(source, /href="\/checkout"/, 'secure checkout link should route to checkout')
  assert.match(source, /href="#collections"/, 'secondary call to action should jump to collections section')
})

test('featured products define descriptive alt text and pricing', () => {
  ;[
    'Neon Kitsune hoodie with glowing accents',
    'Dark joggers with reflective anime inspired panels',
    'Galaxy themed Pupito tee with neon gradients',
    'Pixel pup cap with neon embroidery'
  ].forEach((altText) => {
    assert.ok(
      source.includes(`alt: \"${altText}\"`),
      `Expected featured gallery data to include descriptive alt text for ${altText}`
    )
  })

  assert.match(
    source,
    /className="text-lg font-semibold text-\[#00FFFF\]"/,
    'featured pricing styling should remain neon brand forward'
  )
})

test('store benefits section is labelled for assistive technology', () => {
  assert.match(source, /aria-label="Store benefits"/, 'benefits list should include an accessible label')
  ;['Free US Shipping', 'Quality Guaranteed', 'Earth-Minded', 'Support 24/7'].forEach((benefit) => {
    assert.ok(
      source.includes(`title: \"${benefit}\"`),
      `Expected benefits data to define heading text for ${benefit}`
    )
  })
})

test('lookbook gallery and craft spotlight include descriptive content', () => {
  ;[
    'Two friends in neon hoodies under city lights sharing street food',
    'Pupito joggers styled with gaming arcade cabinets in the background',
    'Creator recording in a studio wearing a neon gradient tee',
    'Athlete stretching on a rooftop in a cap and hoodie at sunrise'
  ].forEach((altText) => {
    assert.ok(source.includes(`alt: \"${altText}\"`), `Lookbook entry missing alt text for ${altText}`)
  })

  ;['Fulfillment', 'Shipping ETA', 'Craft & Care', 'Support'].forEach((label) => {
    assert.ok(source.includes(`label: \"${label}\"`), `Craft highlight label missing for ${label}`)
  })
})

test('shop FAQ communicates key support policies', () => {
  ;[
    'When will I get my order?',
    'How are Pupito products made?',
    'What if something arrives damaged?',
    'Do you offer returns or exchanges?',
    'Can I track my order?'
  ].forEach((question) => {
    assert.ok(source.includes(`question: \"${question}\"`), `FAQ entry missing for ${question}`)
  })
})

test('shop sections expose anchors for navigation shortcuts', () => {
  ;['hero', 'collections', 'featured', 'lookbook', 'craft', 'benefits', 'faq', 'join'].forEach((anchor) => {
    assert.match(source, new RegExp(`id=\\"${anchor}\\"`), `Section should expose id="${anchor}"`)
  })
})
