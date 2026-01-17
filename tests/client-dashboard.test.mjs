import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import path from 'node:path'

const pagePath = path.resolve('src/app/client-dashboard/page.tsx')
const layoutPath = path.resolve('src/app/client-dashboard/layout.tsx')
const pageSource = readFileSync(pagePath, 'utf8')
const layoutSource = readFileSync(layoutPath, 'utf8')

test('client dashboard enforces authenticated access', () => {
  assert.match(pageSource, /useAuth/, 'Dashboard should use auth context')
  assert.ok(
    pageSource.includes("router.push('/login?redirect=/client-dashboard')"), 
    'Dashboard should redirect unauthorized visitors'
  )
  assert.match(pageSource, /Private client access/, 'Dashboard should indicate private access status')
})

test('client dashboard layout is non-indexable and titled', () => {
  assert.ok(layoutSource.includes('Client Dashboard |'), 'Layout should include client dashboard title')
  assert.ok(layoutSource.includes('index: false'), 'Layout should disable indexing via robots metadata')
})
