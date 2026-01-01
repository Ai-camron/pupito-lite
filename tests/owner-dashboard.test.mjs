import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import path from 'node:path'

const pagePath = path.resolve('src/app/owner-dashboard/page.tsx')
const layoutPath = path.resolve('src/app/owner-dashboard/layout.tsx')
const pageSource = readFileSync(pagePath, 'utf8')
const layoutSource = readFileSync(layoutPath, 'utf8')

test('owner dashboard requires authenticated owner access', () => {
  assert.match(pageSource, /useAuth/, 'Dashboard should use auth context')
  assert.ok(
    pageSource.includes("router.push('/login?redirect=/owner-dashboard')"),
    'Dashboard should redirect unauthenticated visitors'
  )
  assert.match(pageSource, /Owner command center/, 'Dashboard should highlight owner access')
})

test('owner dashboard connects to Printful tools', () => {
  assert.match(pageSource, /Printful Quick Actions/, 'Dashboard should include Printful quick actions')
  assert.match(pageSource, /printful\.com/, 'Dashboard should link to Printful pages')
})

test('owner dashboard forms include accessible labels', () => {
  assert.match(pageSource, /htmlFor="product-name"/)
  assert.match(pageSource, /htmlFor="image-file"/)
  assert.match(pageSource, /aria-describedby="image-file-helper"/)
})

test('owner dashboard layout is non-indexable and titled', () => {
  assert.ok(layoutSource.includes('Owner Dashboard |'), 'Layout should include owner dashboard title')
  assert.ok(layoutSource.includes('index: false'), 'Layout should disable indexing via robots metadata')
})
