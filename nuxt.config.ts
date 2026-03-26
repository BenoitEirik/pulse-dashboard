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
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', 'nuxt-lucide-icons', '@nuxtjs/color-mode'],
  components: [
    {
      path: '@/components',
      // shadcn-nuxt manages ui components itself – ignore to avoid .vue vs index.ts conflicts
      ignore: ['**/ui/**'],
    },
  ],
  css: ['@/assets/css/tailwind.css'],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: '@/components/ui'
  },
  colorMode: {
    preference: 'system',
    fallback: 'light'
  }
})