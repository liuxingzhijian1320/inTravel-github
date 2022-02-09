export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  server: {
    port: 1122,
  },
  head: {
    title: '自游',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        // 百度统计
        src: 'https://hm.baidu.com/hm.js?fcc432e801b6',
        async: true,
      },
    ],
  },
  loading: { color: '#3B8070' },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['./assets/styles/index.scss', 'swiper/css/swiper.min.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: './plugins/swiper.js',
      ssr: false,
    },
    {
      src: './plugins/element-ui.js',
      ssr: true,
    },
    {
      src: './plugins/route.js',
      ssr: false,
    },
    {
      src: './plugins/baidu.js',
      ssr: false,
    },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios

  proxy: {
    '/mapi': 'http://localhost:1155',
  },

  // proxy: {
  //   '/mapi': {
  //     target: 'http://localhost:1155',
  //     changeOrigin: true,
  //     pathRewrite: {
  //       '^/mapi': '',
  //     },
  //   },
  // },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // element-ui 按需加载
    babel: {
      plugins: [
        [
          'component',
          {
            libraryName: 'element-ui',
            styleLibraryName: 'theme-chalk',
          },
        ],
      ],
    },
    extend(config, { isClient }) {
      // Extend only webpack config for client-bundle
      if (isClient) {
        // 客户端
        config.devtool = 'source-map'
      }
    },
  },

  router: {
    extendRoutes(routes, resolve) {
      // 自定义 404
      routes.push({
        name: 'custom',
        path: '*',
        component: resolve(__dirname, 'pages/404.vue'),
      })
    },
  },
}
