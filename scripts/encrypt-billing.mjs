#!/usr/bin/env node
/*
 * Encrypt the plaintext billing data (./billing.json) into an AES-256-GCM blob
 * (./public/billing.enc.json) that only decrypts with your PIN.
 *
 * The PIN never touches this repo — you type it here, and only ciphertext is
 * written out. Rotate the PIN by re-running this and redeploying.
 *
 * Usage:
 *   node scripts/encrypt-billing.mjs            # prompts for the PIN (hidden)
 *   BILLING_PIN=1234 node scripts/encrypt-billing.mjs   # non-interactive
 *
 * Key derivation: PBKDF2(SHA-256, 600k iterations) -> AES-GCM 256.
 */
import { readFile, writeFile } from 'node:fs/promises'
import { createInterface } from 'node:readline'
import process from 'node:process'

const IN = process.env.BILLING_IN || './billing.json'
const OUT = process.env.BILLING_OUT || './public/billing.enc.json'
const ITERATIONS = 600_000 // OWASP current guidance for PBKDF2-SHA256
const enc = new TextEncoder()
const b64 = (buf) => Buffer.from(buf).toString('base64')

function readPinArg() {
  const arg = process.argv.find((a) => a.startsWith('--pin='))
  if (arg) return arg.slice('--pin='.length)
  if (process.env.BILLING_PIN) return process.env.BILLING_PIN
  return null
}

function promptHidden(query) {
  return new Promise((resolve) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true })
    rl._writeToOutput = (str) => {
      // Echo the prompt and newlines, mask everything the user types.
      if (str.includes(query) || str.includes('\n') || str.includes('\r')) rl.output.write(str)
      else rl.output.write('*')
    }
    rl.question(query, (answer) => {
      rl.output.write('\n')
      rl.close()
      resolve(answer)
    })
  })
}

async function deriveKey(pin, salt) {
  const material = await crypto.subtle.importKey('raw', enc.encode(pin), 'PBKDF2', false, ['deriveKey'])
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: ITERATIONS, hash: 'SHA-256' },
    material,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt']
  )
}

async function main() {
  let pin = readPinArg()
  if (!pin) pin = await promptHidden('Set billing PIN: ')
  if (!pin || pin.length < 4) {
    console.error('✗ PIN must be at least 4 characters.')
    process.exit(1)
  }

  const billing = JSON.parse(await readFile(IN, 'utf8'))
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const key = await deriveKey(pin, salt)
  const ct = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    enc.encode(JSON.stringify(billing))
  )

  const blob = {
    v: 1,
    kdf: { name: 'PBKDF2', hash: 'SHA-256', iterations: ITERATIONS },
    salt: b64(salt),
    iv: b64(iv),
    ct: b64(ct)
  }

  await writeFile(OUT, JSON.stringify(blob, null, 2) + '\n')
  console.log(`✓ Encrypted ${billing.length} record(s) -> ${OUT}`)
  console.log('  Commit that file and redeploy. Keep your PIN safe — it is the only way in.')
}

main().catch((err) => {
  console.error('✗ Encryption failed:', err.message)
  process.exit(1)
})
