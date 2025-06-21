// https://nuxt.com/docs/api/configuration/nuxt-config



export default defineNuxtConfig({
  compatibilityDate: '2025-06-20',
  devtools: { enabled: true },

  css: [],

  modules: [
    '@pinia/nuxt',
  ],

  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:3001', 
    },
  },
});

