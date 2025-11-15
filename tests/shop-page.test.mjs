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

test('shop sections expose anchors for navigation shortcuts', () => {
  ;['hero', 'collections', 'featured', 'benefits', 'join'].forEach((anchor) => {
    assert.match(source, new RegExp(`id=\\"${anchor}\\"`), `Section should expose id="${anchor}"`)
  })
})
