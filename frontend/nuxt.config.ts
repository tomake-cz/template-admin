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
      'Source Code Pro': {
        wght: [400],
      },
    },
  },
});
