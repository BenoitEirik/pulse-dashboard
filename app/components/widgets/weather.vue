<script setup lang="ts">
import { LucideCircleAlert } from 'lucide-vue-next';

const props = defineProps<{ widgetId: string }>();
const store = useDashboardStore();

const widget = computed(() => store.widgets.find((w) => w.id === props.widgetId));
const iconUrl = ref<string>('');

onMounted(async () => {
  if (widget.value?.status === 'idle') {
    await store.fetchWidgetData(props.widgetId);
  }

  iconUrl.value = useWeatherIcon(
    weatherData.value?.current?.weather_code,
    weatherData.value?.current?.is_day
  );
  weatherData.value = widget.value?.data as WeatherResponse | null;
});

const weatherData = ref<WeatherResponse | null>(null);
</script>

<template>
  <Card class="size-full overflow-hidden transition-all">
    <CardHeader class="flex items-start justify-between gap-2">
      <CardTitle class="text-base font-semibold md:text-lg"> Météo </CardTitle>
      <img :src="iconUrl" class="h-20 w-20" />
    </CardHeader>

    <CardContent class="h-full">
      <div v-if="widget?.status === 'loading'" class="space-y-2">
        <Skeleton class="h-8 w-1/2" />
        <Skeleton class="h-4 w-3/4" />
      </div>

      <div
        v-else-if="widget?.status === 'success' && weatherData"
        class="flex h-full flex-col justify-center">
        <div class="flex items-baseline gap-1">
          <span class="text-foreground text-5xl font-bold tracking-tight">
            {{ Math.round(weatherData.current.temperature_2m)
            }}<span class="text-muted-foreground text-2xl font-medium">°C</span>
          </span>
        </div>
        <p class="text-muted-foreground mt-2 text-base">
          Vent : {{ weatherData.current.wind_speed_10m }} km/h
        </p>
      </div>

      <div v-else-if="widget?.status === 'error'" class="text-destructive flex items-center gap-2">
        <LucideCircleAlert class="h-4 w-4" />
        <span class="text-xs">Erreur de chargement</span>
      </div>
    </CardContent>
  </Card>
</template>
