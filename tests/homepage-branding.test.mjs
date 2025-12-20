import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import path from 'node:path'

const homepagePath = path.resolve('src/components/PupitoHomepage.tsx')
const source = readFileSync(homepagePath, 'utf8')

test('homepage hero uses Pupito-specific imagery', () => {
  assert.ok(
    source.includes('pupito-lookbook-hero.svg'),
    'Hero should use Pupito lookbook hero artwork with apparel focus'
  )
  assert.match(source, /Pupito neon crest badge/, 'Hero crest image should include descriptive alt text')
})

test('brand art grid references personalized assets with alt text', () => {
  const expectedAssets = [
    { file: 'pupito-crest.svg', alt: 'Pupito crest patch' },
    { file: 'pupito-sticker-wall.svg', alt: 'Pupito stickers' },
    { file: 'pupito-arcade-aura.svg', alt: 'Pupito mascot in an arcade glow' },
  ]

  for (const asset of expectedAssets) {
    assert.match(source, new RegExp(asset.file), `Brand art should include ${asset.file}`)
    assert.match(source, new RegExp(asset.alt), `Brand art should describe ${asset.file} with accessible alt text`)
  }
})

test('featured and design sections layer clothing brand backgrounds', () => {
  assert.match(source, /pupito-streetwear-grid\.svg/, 'Featured section should include streetwear grid background')
  assert.match(source, /pupito-collection-mesh\.svg/, 'Design lab should include collection mesh background')
})
