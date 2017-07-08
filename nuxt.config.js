module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '⛓ Blockchains 🔐 Cryptography 🤝 Smart Contracts',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'Geefu', name: 'Geefu', content: 'Geefu' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    'bootstrap/dist/css/bootstrap.css',
    'bootstrap-vue/dist/bootstrap-vue.css'
  ],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070',
              height: '10px' },
  /*
  ** Build configuration
  */
  build: {
    // loaders: [
    //   {
    //     test: /\.css$/,
    //     loader: 'vue-style-loader!css-loader'
    //   }
    // ],
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
