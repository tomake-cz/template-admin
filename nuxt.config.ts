// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'TOMAKE Template Client',
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
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', 'nuxt-headlessui'],
  css: ['~/assets/css/main.css'],
  typescript: {
    shim: false,
  },
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.js',
  },
  build: {
    transpile: ['trpc-nuxt'],
  },
  runtimeConfig: {
    public: {
      NUXT_PUBLIC_TRPC_ENDPOINT: process.env.NUXT_PUBLIC_TRPC_ENDPOINT,
    },
  },
});
