<template>
  <main class="racun">
    <div class="fade-in shell">
      <header class="bar">
        <span class="dim">$&nbsp;</span>billing<span class="cursor blink">_</span>
      </header>

      <!-- Locked: PIN gate -->
      <form v-if="!unlocked" class="gate" @submit.prevent="submit">
        <label class="lbl" for="pin">enter pin / passphrase</label>
        <input
          id="pin"
          ref="pinInput"
          v-model="pin"
          type="password"
          autocomplete="off"
          spellcheck="false"
          class="pin"
          :class="{ err: error }"
          placeholder="••••••••"
        >
        <label class="remember">
          <input v-model="remember" type="checkbox">
          remember on this device
        </label>
        <button class="btn" type="submit" :disabled="busy || !pin">
          {{ busy ? 'decrypting…' : 'unlock' }}
        </button>
        <p v-if="error" class="msg err-msg">✗ {{ error }}</p>
      </form>

      <!-- Unlocked: billing records -->
      <div v-else class="records">
        <article v-for="(rec, i) in records" :key="i" class="rec">
          <div class="rec-head">
            <span class="rec-title">{{ rec.title }}</span>
            <button class="copy" type="button" @click="copy(rec, i)">
              {{ copiedIndex === i ? '✓ copied' : 'copy' }}
            </button>
          </div>
          <pre class="rec-body">{{ rec.lines.join('\n') }}</pre>
        </article>
        <button class="forget" type="button" @click="lock">lock</button>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

// Keep this page out of search engines (belt-and-suspenders with robots.txt
// and the Netlify X-Robots-Tag header).
useHead({
  title: 'billing',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }]
})

const STORAGE_KEY = 'geefu.billing.pin'

const pin = ref('')
const remember = ref(true)
const busy = ref(false)
const error = ref('')
const unlocked = ref(false)
const records = ref([])
const copiedIndex = ref(-1)
const pinInput = ref(null)

let blobPromise = null
function loadBlob() {
  // Fetch the ciphertext once, lazily. It contains no plaintext.
  if (!blobPromise) blobPromise = $fetch('/billing.enc.json')
  return blobPromise
}

const b64ToBuf = (b64) => Uint8Array.from(atob(b64), (c) => c.charCodeAt(0))

async function decrypt(pinValue, blob) {
  const salt = b64ToBuf(blob.salt)
  const iv = b64ToBuf(blob.iv)
  const ct = b64ToBuf(blob.ct)
  const material = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(pinValue),
    'PBKDF2',
    false,
    ['deriveKey']
  )
  const key = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: blob.kdf.iterations, hash: blob.kdf.hash },
    material,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  )
  const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ct)
  return JSON.parse(new TextDecoder().decode(plain))
}

async function tryUnlock(pinValue, { persist } = {}) {
  busy.value = true
  error.value = ''
  try {
    const blob = await loadBlob()
    records.value = await decrypt(pinValue, blob)
    unlocked.value = true
    if (persist) localStorage.setItem(STORAGE_KEY, pinValue)
    return true
  } catch {
    // AES-GCM auth failure on a wrong PIN throws here.
    error.value = 'wrong pin'
    localStorage.removeItem(STORAGE_KEY)
    await nextTick()
    pinInput.value?.focus()
    return false
  } finally {
    busy.value = false
  }
}

function submit() {
  if (!pin.value) return
  tryUnlock(pin.value, { persist: remember.value })
}

function lock() {
  localStorage.removeItem(STORAGE_KEY)
  records.value = []
  pin.value = ''
  unlocked.value = false
  nextTick(() => pinInput.value?.focus())
}

async function copy(rec, i) {
  const text = rec.lines.join('\n')
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    // Fallback for older clipboard permissions.
    const ta = document.createElement('textarea')
    ta.value = text
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    ta.remove()
  }
  copiedIndex.value = i
  setTimeout(() => {
    if (copiedIndex.value === i) copiedIndex.value = -1
  }, 1500)
}

onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) tryUnlock(saved, { persist: true })
  else pinInput.value?.focus()
})
</script>

<style scoped>
.racun {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 2rem 1rem;
}

.shell {
  width: 100%;
  max-width: 420px;
}

.bar {
  font-size: 1.1rem;
  letter-spacing: 0.04em;
  padding-bottom: 1.1rem;
  margin-bottom: 1.1rem;
  border-bottom: 1px solid var(--line);
}

.dim {
  color: var(--accent-dim);
}

.cursor {
  color: var(--accent);
}

/* gate */
.gate {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.lbl {
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--fg-dim);
}

.pin {
  font-family: var(--mono);
  font-size: 1.3rem;
  letter-spacing: 0.4em;
  text-align: center;
  color: var(--fg);
  background: var(--bg-soft);
  border: 1px solid var(--line);
  border-radius: 6px;
  padding: 0.7rem;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.pin:focus {
  border-color: var(--accent-dim);
  box-shadow: 0 0 0 2px rgba(61, 220, 132, 0.12);
}

.pin.err {
  border-color: var(--danger);
}

.remember {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.78rem;
  color: var(--fg-dim);
  cursor: pointer;
}

.remember input {
  accent-color: var(--accent);
}

.btn {
  font-family: var(--mono);
  font-size: 0.9rem;
  letter-spacing: 0.08em;
  color: var(--bg);
  background: var(--accent);
  border: 0;
  border-radius: 6px;
  padding: 0.65rem;
  cursor: pointer;
  transition: opacity 0.2s ease, transform 0.05s ease;
}

.btn:hover {
  opacity: 0.9;
}

.btn:active {
  transform: translateY(1px);
}

.btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.msg {
  margin: 0;
  font-size: 0.8rem;
}

.err-msg {
  color: var(--danger);
}

/* records */
.records {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.rec {
  background: var(--bg-soft);
  border: 1px solid var(--line);
  border-radius: 8px;
  overflow: hidden;
}

.rec-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.6rem 0.85rem;
  border-bottom: 1px solid var(--line);
}

.rec-title {
  font-size: 0.82rem;
  color: var(--accent);
  letter-spacing: 0.02em;
}

.copy {
  font-family: var(--mono);
  font-size: 0.72rem;
  letter-spacing: 0.06em;
  color: var(--fg-dim);
  background: transparent;
  border: 1px solid var(--line);
  border-radius: 5px;
  padding: 0.25rem 0.6rem;
  cursor: pointer;
  transition: color 0.2s ease, border-color 0.2s ease;
}

.copy:hover {
  color: var(--accent);
  border-color: var(--accent-dim);
}

.rec-body {
  margin: 0;
  padding: 0.85rem;
  font-family: var(--mono);
  font-size: 0.86rem;
  line-height: 1.65;
  color: var(--fg);
  white-space: pre-wrap;
  word-break: break-word;
  user-select: text;
}

.forget {
  align-self: flex-start;
  font-family: var(--mono);
  font-size: 0.74rem;
  letter-spacing: 0.08em;
  color: var(--fg-dim);
  background: transparent;
  border: 0;
  padding: 0.3rem 0;
  cursor: pointer;
}

.forget:hover {
  color: var(--danger);
}
</style>
