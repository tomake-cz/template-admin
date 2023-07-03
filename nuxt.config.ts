import './src/env';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'TOMAKER Template',
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
  experimental: {
    renderJsonPayloads: false,
  },
  modules: [
    '@nuxtjs/tailwindcss',
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'storeToRefs'],
      },
    ],
    '@nuxtjs/google-fonts',
    '@vue-macros/nuxt',
    '@vueuse/nuxt',
    'nuxt-headlessui',
  ],
  // imports: {
  //   dirs: ['./composables', './stores'],
  // },
  css: ['~/assets/css/main.css'],
  build: {
    transpile: ['trpc-nuxt'],
  },
  typescript: {
    strict: true,
    shim: false,
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
