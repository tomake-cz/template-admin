// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'TOMAKE Template',
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico',
        },
      ],
      htmlAttrs: {
        lang: 'cs',
      },
      meta: [
        {
          charset: 'utf-8',
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
      ],
    },
  },
  srcDir: 'src/',
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/apollo',
    '@nuxtjs/google-fonts',
  ],
  css: ['~/assets/css/main.css', 'vuetify/lib/styles/main.sass'],
  build: {
    transpile: ['vuetify'],
  },
  typescript: {
    shim: false,
  },
  apollo: {
    clients: {
      default: {
        httpEndpoint: 'http://localhost:4000/graphql',
      },
    },
  },
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.js',
  },
  googleFonts: {
    families: {
      Montserrat: true,
    },
  },
});
