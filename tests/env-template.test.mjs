import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const envTemplate = readFileSync('.env.example', 'utf8')
const loginRoute = readFileSync('src/app/api/auth/login/route.ts', 'utf8')

test('env template lists all mailer and auth variables', () => {
  const expectedKeys = [
    'JWT_SECRET',
    'EMAIL_PROVIDER',
    'EMAIL_USER',
    'EMAIL_APP_PASSWORD',
    'EMAIL_PASSWORD',
    'EMAIL_HOST',
    'EMAIL_PORT',
    'EMAIL_SECURE',
    'NOTIFICATION_EMAIL',
  ]

  for (const key of expectedKeys) {
    assert.match(envTemplate, new RegExp(`^${key}=`, 'm'), `Expected ${key} in .env.example`)
  }
})

test('login route requires an environment-provided JWT secret', () => {
  assert.ok(
    !loginRoute.includes('your-super-secret-key-change-this-in-production'),
    'Login route should not fallback to a hardcoded JWT secret'
  )

  assert.match(loginRoute, /getJwtSecret/, 'Login route should retrieve JWT secret from env helper')
})
