<template>
  <main class="home">
    <div class="fade-in wrap">
      <h1 class="wordmark">
        <span class="prompt">$&nbsp;</span>geefu<span class="cursor blink">_</span>
      </h1>
      <p class="tagline">
        <a href="https://hypersignal.xyz/" rel="noopener">matej's track record →</a>
      </p>
    </div>
  </main>
</template>

<script setup>
useHead({
  title: 'geefu',
  meta: [{ name: 'description', content: 'geefu' }]
})
</script>

<style scoped>
.home {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 2rem;
}

.wrap {
  text-align: center;
}

.wordmark {
  margin: 0;
  font-weight: 500;
  font-size: clamp(2.6rem, 12vw, 6rem);
  letter-spacing: 0.04em;
  color: var(--fg);
  text-shadow:
    0 0 12px rgba(61, 220, 132, 0.25),
    0 0 40px rgba(61, 220, 132, 0.12);
}

.prompt {
  color: var(--accent-dim);
}

.cursor {
  color: var(--accent);
  font-weight: 400;
}

.tagline {
  margin: 1.4rem 0 0;
  font-size: 0.82rem;
  letter-spacing: 0.14em;
  text-transform: lowercase;
}

.tagline a {
  color: var(--fg-dim);
}

.tagline a:hover {
  color: var(--accent);
}
</style>
