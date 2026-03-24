// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  $production: {
    hooks: {
      'pages:extend'(pages) {
        // Remove pages to not include in the production build
        const filteredPages = pages.filter(page => !page.path.includes('/styleguide'))
        pages.length = 0
        pages.push(...filteredPages)
      }
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    'nuxt-lucide-icons'
  ],
  components: [
    {
      path: '~/app/components',
      // We ask Nuxt to ignore .ts files for auto-import
      // because they are only used for manual exports and types
      extensions: ['.vue'], 
      pathPrefix: false,
    },
  ],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  }
})