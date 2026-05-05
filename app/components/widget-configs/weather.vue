<script setup lang="ts">
import { LucideSearch, LucideMapPin, LucideCheck } from 'lucide-vue-next';

interface GeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
}

const emit = defineEmits<{
  submit: [config: DashboardWidget['config']];
}>();

const searchQuery = ref('');
const results = ref<GeocodingResult[]>([]);
const isLoading = ref(false);
const selectedCity = ref<GeocodingResult | null>(null);

async function searchCity() {
  if (!searchQuery.value.trim()) return;
  isLoading.value = true;
  const { data, error } = await useApi<{ results?: GeocodingResult[] }>('geocoding', '/v1/search', {
    query: {
      name: searchQuery.value,
      count: '5',
      language: 'fr',
      format: 'json',
    },
  });
  if (error || !data) {
    results.value = [];
  } else {
    results.value = data.results || [];
  }
  isLoading.value = false;
}

function selectCity(city: GeocodingResult) {
  selectedCity.value = city;
  results.value = [];
  searchQuery.value = `${city.name}, ${city.admin1 || ''}, ${city.country}`;
}

function submit() {
  if (!selectedCity.value) return;

  emit('submit', {
    apiName: 'weather',
    endpoint: '/v1/forecast',
    params: {
      latitude: selectedCity.value.latitude,
      longitude: selectedCity.value.longitude,
      current: 'weather_code,temperature_2m,wind_speed_10m,wind_direction_10m',
      timezone: 'Europe/Berlin',
      past_days: 0,
      forecast_days: 1,
    },
  });
}
</script>

<template>
  <div class="space-y-4">
    <div class="space-y-2">
      <Label for="city-search">Rechercher une ville</Label>
      <div class="flex gap-2">
        <Input
          id="city-search"
          v-model="searchQuery"
          placeholder="Ex: Paris, Le Mans, Lyon..."
          @keydown.enter.prevent="searchCity" />
        <Button variant="secondary" :disabled="isLoading" @click="searchCity">
          <LucideSearch v-if="!isLoading" class="h-4 w-4" />
          <span
            v-else
            class="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        </Button>
      </div>
    </div>

    <div v-if="results.length > 0" class="space-y-2">
      <p class="text-muted-foreground text-xs">Résultats</p>
      <div class="space-y-1">
        <button
          v-for="city in results"
          :key="city.id"
          class="hover:bg-accent flex w-full items-center gap-3 rounded-md border p-3 text-left transition-colors"
          @click="selectCity(city)">
          <LucideMapPin class="text-muted-foreground h-4 w-4 shrink-0" />
          <div class="flex-1">
            <p class="text-sm font-medium">{{ city.name }}</p>
            <p class="text-muted-foreground text-xs">
              {{ city.admin1 ? `${city.admin1}, ` : '' }}{{ city.country }}
            </p>
          </div>
          <LucideCheck v-if="selectedCity?.id === city.id" class="text-primary h-4 w-4" />
        </button>
      </div>
    </div>

    <div
      v-else-if="searchQuery && !isLoading && !selectedCity"
      class="text-muted-foreground text-center text-sm">
      Aucun résultat
    </div>

    <div v-if="selectedCity" class="bg-accent/50 rounded-md border p-3">
      <div class="flex items-center gap-2">
        <LucideMapPin class="text-primary h-4 w-4" />
        <span class="text-sm font-medium">{{ selectedCity.name }}</span>
      </div>
      <p class="text-muted-foreground text-xs">
        {{ selectedCity.latitude.toFixed(4) }}, {{ selectedCity.longitude.toFixed(4) }}
      </p>
    </div>

    <div class="flex justify-end pt-2">
      <Button :disabled="!selectedCity" @click="submit"> Ajouter le widget </Button>
    </div>
  </div>
</template>
