import { defineAsyncComponent } from 'vue'

export const WIDGET_COMPONENTS: Record<string, any> = {
  weather: defineAsyncComponent(() => import('@/components/widgets/weather.vue')),
  github: defineAsyncComponent(() => import('@/components/widgets/github.vue')),
  crypto: defineAsyncComponent(() => import('@/components/widgets/crypto.vue')),
}