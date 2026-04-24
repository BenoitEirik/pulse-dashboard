<script lang="ts" setup>
const dashboardStore = useDashboardStore();

// https://api.open-meteo.com/v1/forecast?latitude=48.0021&longitude=0.2025&current=weather_code,temperature_2m,wind_speed_10m,wind_direction_10m&timezone=Europe%2FBerlin&past_days=0&forecast_days=1
dashboardStore.widgets.push({
  id: 'test-weather',
  type: 'weather',
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
  },
  status: 'idle',
  data: {},
});

// https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=bitcoin&x_cg_demo_api_key=CG-hPPq6o751tyfCRVmDzrkKbdJ
dashboardStore.widgets.push({
  id: 'test-crypto',
  type: 'crypto',
  config: {
    apiName: 'crypto',
    endpoint: '/coins/bitcoin/market_chart',
    params: {
      vs_currency: 'eur',
      days: '1',
      x_cg_demo_api_key: useRuntimeConfig().public.coingecko_api_key,
    },
  },
  status: 'idle',
  data: {},
});

// https://api.github.com/users/benoiteirik
dashboardStore.widgets.push({
  id: 'test-github',
  type: 'github',
  config: {
    apiName: 'github',
    endpoint: '/users/benoiteirik',
    params: {},
  },
  status: 'idle',
  data: {},
});
</script>

<template>
  <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
    <div class="grid auto-rows-min grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
      <div class="bg-muted/50 aspect-video rounded-xl lg:aspect-auto">
        <WeatherWidget widgetId="test-weather" />
      </div>
      <CryptoWidget widgetId="test-crypto" />
      <GithubWidget widgetId="test-github" />
    </div>
  </div>
</template>

<style></style>
