module.exports = {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  telemetry:false,
  head: {
    title: 'nuxt-jitsi',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {src: '/jitsi-ext.js'}
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/socket-io'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  // axios: {
  //   proxy: true,
  //   credentials: true
  // },
  // proxy: {
  //   '/socket.io': {
  //     target: 'http://localhost:4000/',
  //     changeOrigin: true,
  //     pathRewrite: {
  //       '^/socket.io': '/socket.io'
  //     }
  //   },
  // },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: [/^element-ui/, 'socket.io-client']
  }
}