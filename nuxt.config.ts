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
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    'nuxt-lucide-icons'
  ],
  components: [
    {
      path: '@/components',
      // shadcn-nuxt manages ui components itself – ignore to avoid .vue vs index.ts conflicts
      ignore: ['**/ui/**'],
    },
  ],
  shadcn: {
    /**
     * Prefix for all the imported component.
     * @default "Ui"
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * Will respect the Nuxt aliases.
     * @link https://nuxt.com/docs/api/nuxt-config#alias
     * @default "@/components/ui"
     */
    componentDir: '@/components/ui'
  },
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: '',
  }
})