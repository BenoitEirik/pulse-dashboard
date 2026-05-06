<script setup lang="ts">
const emit = defineEmits<{
  submit: [config: DashboardWidget['config']];
}>();

import { COUNTRIES, type Country } from '@/data/countries';

const searchQuery = ref('');
const selectedCountries = ref<Country[]>([]);

const filteredCountries = computed<Country[]>(() => {
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return COUNTRIES;
  return COUNTRIES.filter(
    (c: Country) => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)
  );
});

function addCountry(country: Country) {
  if (!selectedCountries.value.find((c) => c.code === country.code)) {
    selectedCountries.value.push(country);
  }
  searchQuery.value = '';
}

function removeCountry(code: string) {
  selectedCountries.value = selectedCountries.value.filter((c) => c.code !== code);
}

function submit() {
  if (!selectedCountries.value.length) return;

  emit('submit', {
    apiName: 'flags',
    endpoint: '',
    params: {
      countries: selectedCountries.value.map((c) => ({ code: c.code, name: c.name })),
    },
  });
}
</script>

<template>
  <div class="space-y-4">
    <div class="space-y-2">
      <Label for="country-search">Rechercher un pays</Label>
      <Input id="country-search" v-model="searchQuery" placeholder="Ex: France, Japon, Brésil..." />
    </div>

    <div
      v-if="filteredCountries.length > 0 && searchQuery.trim()"
      class="max-h-40 space-y-1 overflow-y-auto rounded-md border p-1">
      <button
        v-for="country in filteredCountries.slice(0, 10)"
        :key="country.code"
        class="hover:bg-accent flex w-full items-center gap-3 rounded-md px-3 py-2 text-left transition-colors"
        @click="addCountry(country)">
        <img
          :src="`https://flagcdn.com/${country.code.toLowerCase()}.svg`"
          :alt="country.name"
          class="h-4 w-6 shrink-0 object-cover" />
        <span class="text-sm">{{ country.name }}</span>
        <span class="text-muted-foreground ml-auto text-xs">{{ country.code }}</span>
      </button>
    </div>

    <div
      v-else-if="searchQuery.trim() && !filteredCountries.length"
      class="text-muted-foreground text-center text-sm">
      Aucun pays trouvé
    </div>

    <div v-if="selectedCountries.length" class="space-y-2">
      <Label>Pays sélectionnés ({{ selectedCountries.length }})</Label>
      <div class="flex flex-wrap gap-2">
        <div
          v-for="country in selectedCountries"
          :key="country.code"
          class="bg-accent flex items-center gap-1.5 rounded-md px-2 py-1 text-xs">
          <img
            :src="`https://flagcdn.com/${country.code.toLowerCase()}.svg`"
            :alt="country.name"
            class="h-3 w-4 object-cover" />
          <span>{{ country.name }}</span>
          <button
            class="text-muted-foreground hover:text-foreground ml-1 transition-colors"
            @click="removeCountry(country.code)">
            <LucideX class="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>

    <div class="flex justify-end pt-2">
      <Button :disabled="!selectedCountries.length" @click="submit">Ajouter le widget</Button>
    </div>
  </div>
</template>
