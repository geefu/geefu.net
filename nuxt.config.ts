// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: false },

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      title: 'geefu',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'geefu' },
        { name: 'theme-color', content: '#0a0a0a' }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    }
  },

  // Old path still works for any existing bookmarks/links.
  //
  // This lives here rather than in netlify.toml on purpose: Netlify evaluates
  // the generated dist/_redirects *before* netlify.toml, and the netlify-static
  // preset writes a `/* /404.html 404` catch-all into it — which would swallow
  // /racun first. A routeRule is emitted into _redirects above that catch-all.
  // Both spellings: Netlify normalizes /racun -> /racun/ *before* matching
  // redirects, so a rule for the bare path alone never fires as a real 301 —
  // it ends up serving /billing's content at /racun/ instead of consolidating
  // onto one URL.
  routeRules: {
    '/racun': { redirect: { to: '/billing', statusCode: 301 } },
    '/racun/': { redirect: { to: '/billing', statusCode: 301 } }
  },

  // Fully static output. `nuxt generate` -> .output/public locally, ./dist on
  // Netlify (see the note in netlify.toml).
  nitro: {
    prerender: {
      routes: ['/', '/billing']
    }
  }
})
