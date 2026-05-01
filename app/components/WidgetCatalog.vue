<script setup lang="ts">
interface WidgetInfo {
  type: WidgetType;
  name: string;
  description: string;
  icon: string;
  config: DashboardWidget['config'];
}

const emit = defineEmits<{
  close: [];
}>();

// TODO: Les composants sont fournies ici mais à l'avenir ce sera via un dialog pour remplir le config par l'utilisateur
const availableWidgets: WidgetInfo[] = [
  {
    type: 'weather' satisfies WidgetType,
    name: 'Open-Meteo',
    description: 'Affiche les informations météorologiques actuelles',
    icon: 'asset-icons:open-meteo',
    config: {
      apiName: 'weather',
      endpoint: '/v1/forecast',
      params: {
        latitude: 48.0021,
        longitude: 0.2025,
        current: 'weather_code,temperature_2m,wind_speed_10m,wind_direction_10m',
        timezone: 'Europe/Berlin',
        past_days: 0,
        forecast_days: 1,
      },
    } satisfies DashboardWidget['config'],
  },
  {
    type: 'crypto' satisfies WidgetType,
    name: 'Coingecko',
    description: 'Évolution du prix sur 24h',
    icon: 'simple-icons:bitcoin',
    config: {
      apiName: 'crypto',
      endpoint: '/coins/bitcoin/market_chart',
      params: {
        vs_currency: 'eur',
        days: '1',
        x_cg_demo_api_key: useRuntimeConfig().public.coingecko_api_key,
      },
    } satisfies DashboardWidget['config'],
  },
  {
    type: 'github' satisfies WidgetType,
    name: 'GitHub',
    description: 'Affiche les statistiques de votre profil GitHub',
    icon: 'simple-icons:github',
    config: {
      apiName: 'github',
      endpoint: '/users/benoiteirik',
      params: {},
    } satisfies DashboardWidget['config'],
  },
];

const store = useDashboardStore();

function addWidget(widget: WidgetInfo) {
  store.addWidget(widget.type, widget.config);
  emit('close');
}
</script>

<template>
  <div class="space-y-4 h-full flex flex-col flex-1 overflow-y-auto">
    <div class="space-y-4 px-4 flex-1">
      <div
        v-for="widget in [...availableWidgets, ...availableWidgets, ...availableWidgets]"
        :key="widget.type"
        class="hover:bg-accent/50 group flex cursor-pointer items-center justify-between gap-3 rounded-lg border p-4 transition-colors"
        @click="addWidget(widget)">
        <div class="flex items-center gap-3">
          <div
            class="bg-primary/10 text-primary flex aspect-square h-12 w-12 items-center justify-center self-start rounded-lg transition-transform group-hover:scale-110">
            <Icon :name="widget.icon" class="h-6 w-6" />
          </div>
          <div>
            <h4 class="font-medium">{{ widget.name }}</h4>
            <p class="text-muted-foreground text-sm">{{ widget.description }}</p>
          </div>
        </div>

        <div class="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <LucidePlus class="h-4 w-4" />
        </div>
      </div>
    </div>

    <div class="border-t text-center shrink-0 p-4">
      <p class="text-muted-foreground text-xs">Plus de widgets seront bientôt disponibles</p>
    </div>
  </div>
</template>
