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
    },
  },
  srcDir: 'src/',
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/apollo',
    '@nuxtjs/google-fonts',
  ],
  typescript: {
    shim: false,
  },
  apollo: {
    clients: {
      default: {
        httpEndpoint: 'https://graphqlzero.almansi.me/api',
      },
    },
  },
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.js',
  },
  googleFonts: {
    families: {
      'Source Code Pro': {
        wght: [400],
      },
    },
  },
});
