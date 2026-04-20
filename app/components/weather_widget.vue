<script setup lang="ts">
import { LucideSun, LucideCloud, LucideCloudRain, LucideCloudSun, LucideCloudFog, LucideCloudRainWind, LucideCircleAlert } from 'lucide-vue-next'
import type { WeatherResponse } from '~/types/weather'

const props = defineProps<{ widgetId: string }>()
const store = useDashboardStore()

const widget = computed(() => store.widgets.find(w => w.id === props.widgetId))
const iconUrl = ref<string>('')

onMounted(async () => {
  console.log('Weather widget mounted', widget.value)
  if (widget.value?.status === 'idle') {
    await store.fetchWidgetData(props.widgetId)
  }

  iconUrl.value = useWeatherIcon(
    weatherData.value?.current?.weather_code, 
    weatherData.value?.current?.is_day
  )
  weatherData.value = widget.value?.data as WeatherResponse | null
})

const weatherData = ref<WeatherResponse | null>(null)
</script>

<template>
  <Card class="overflow-hidden transition-all w-full h-full">
    <CardHeader>
      <CardTitle class="text-sm font-medium flex items-center gap-2 justify-between">
        <span class="xl:text-2xl lg:text-xl md:text-lg text-base">Météo</span>
        <img :src="iconUrl" class="w-24 h-24" />
      </CardTitle>
    </CardHeader>

    <CardContent class="h-full">
      <div v-if="widget?.status === 'loading'" class="space-y-2">
        <Skeleton class="h-8 w-1/2" />
        <Skeleton class="h-4 w-3/4" />
      </div>

      <div v-else-if="widget?.status === 'success' && weatherData" class="flex flex-col justify-center h-full">
        <div class="flex items-baseline gap-1">
          <span class="text-3xl font-bold">
            {{ Math.round(weatherData.current.temperature_2m) }} °C
          </span>
        </div>
        <p class="text-base text-muted-foreground mt-1">
          Vent : {{ weatherData.current.wind_speed_10m }} km/h
        </p>
      </div>

      <div v-else-if="widget?.status === 'error'" class="flex items-center gap-2 text-destructive">
        <LucideCircleAlert class="w-4 h-4" />
        <span class="text-xs">Erreur de chargement</span>
      </div>
    </CardContent>
  </Card>
</template>