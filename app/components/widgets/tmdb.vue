<script setup lang="ts">
const props = defineProps<{ widgetId: string }>();
const store = useDashboardStore();

const widget = computed(() => store.widgets.find((w) => w.id === props.widgetId));
const trending = computed(() => widget.value?.data as TmdbTrendingResponse | null);

const results = computed(() => trending.value?.results?.slice(0, 6) ?? []);

const filters = computed(() => {
  const parts = widget.value?.config.endpoint.split('/') ?? [];
  const mediaType = parts[2] ?? 'movie';
  const timeWindow = parts[3] ?? 'day';

  const mediaLabels: Record<string, string> = {
    movie: 'Films',
    tv: 'Séries',
    all: 'Tout',
  };

  const windowLabels: Record<string, string> = {
    day: "Aujourd'hui",
    week: 'Semaine',
  };

  return {
    media: mediaLabels[mediaType] ?? mediaType,
    window: windowLabels[timeWindow] ?? timeWindow,
  };
});

onMounted(async () => {
  if (widget.value?.status === 'idle') {
    await store.fetchWidgetData(props.widgetId);
  }
});

function posterUrl(path: string | null) {
  if (!path) return '';
  return `https://image.tmdb.org/t/p/w200${path}`;
}
</script>

<template>
  <Card class="flex h-full w-full flex-col overflow-hidden transition-all">
    <CardHeader class="pb-2">
      <div class="flex items-center justify-between">
        <CardTitle class="text-base font-medium md:text-lg lg:text-xl xl:text-2xl">
          Tendances
        </CardTitle>
        <Icon name="simple-icons:themoviedatabase" class="text-primary h-5 w-5" />
      </div>
      <div class="mt-1 flex items-center gap-1.5">
        <Badge variant="secondary" class="text-[10px]">{{ filters.media }}</Badge>
        <Badge variant="outline" class="text-[10px]">{{ filters.window }}</Badge>
      </div>
    </CardHeader>

    <CardContent class="flex-1 overflow-hidden">
      <div v-if="widget?.status === 'loading'" class="flex h-full gap-3 overflow-x-auto pb-1">
        <div v-for="i in 3" :key="i" class="w-[90px] shrink-0 space-y-2">
          <Skeleton class="aspect-2/3 w-full rounded-md" />
          <Skeleton class="h-3 w-full" />
        </div>
      </div>

      <div v-else-if="results.length" class="flex h-full items-center gap-3 overflow-x-auto pb-1">
        <div v-for="item in results" :key="item.id" class="w-[90px] shrink-0 pb-3">
          <div
            :title="item.title || item.name"
            class="bg-muted relative aspect-2/3 w-full overflow-hidden rounded-md">
            <img
              v-if="item.poster_path"
              :src="posterUrl(item.poster_path)"
              :alt="item.title || item.name"
              class="h-full w-full object-cover" />
            <div v-else class="flex h-full w-full items-center justify-center">
              <LucideImageOff class="text-muted-foreground h-4 w-4" />
            </div>
          </div>

          <p class="mt-1.5 truncate text-xs font-medium">{{ item.title || item.name }}</p>
          <div class="flex items-center gap-1">
            <LucideStar class="h-2.5 w-2.5 text-yellow-500" />
            <span class="text-muted-foreground text-[10px]">{{
              item.vote_average.toFixed(1)
            }}</span>
          </div>
        </div>
      </div>

      <div v-else class="text-muted-foreground flex h-full items-center justify-center text-xs">
        Aucune donnée disponible
      </div>
    </CardContent>
  </Card>
</template>
