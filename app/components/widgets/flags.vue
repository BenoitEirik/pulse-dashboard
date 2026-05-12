<script setup lang="ts">
interface FlagCountry {
  code: string;
  name: string;
}

const props = defineProps<{ widgetId: string }>();
const store = useDashboardStore();

const widget = computed(() => store.widgets.find((w) => w.id === props.widgetId));
const config = computed(() => widget.value?.config?.params);

const countries = computed<FlagCountry[]>(() => config.value?.countries ?? []);

function flagUrl(code: string) {
  return `https://flagcdn.com/${code.toLowerCase()}.svg`;
}
</script>

<template>
  <Card class="flex h-full w-full flex-col overflow-hidden transition-all">
    <CardHeader class="pb-2">
      <div class="flex items-center justify-between">
        <CardTitle class="text-base font-semibold md:text-lg"> Drapeaux </CardTitle>
        <Icon name="lucide:flag" class="text-primary h-5 w-5" />
      </div>
    </CardHeader>

    <CardContent class="flex-1 overflow-hidden p-3">
      <div v-if="countries.length" class="flex flex-wrap justify-center gap-2">
        <div
          v-for="country in countries"
          :key="country.code"
          class="flex flex-col items-center justify-center gap-1 p-2"
          :title="country.name">
          <img
            :src="flagUrl(country.code)"
            :alt="country.name"
            class="h-32 max-h-52 w-auto border"
            :class="{ 'h-auto': countries.length === 1 }" />
          <p class="text-center text-sm font-medium">{{ country.name }}</p>
        </div>
      </div>
      <div v-else class="text-muted-foreground flex h-full items-center justify-center text-xs">
        Aucun drapeau sélectionné
      </div>
    </CardContent>
  </Card>
</template>
