<script setup lang="ts">
interface ApodData {
  title: string;
  explanation: string;
  url: string;
  hdurl?: string;
  media_type: 'image' | 'video';
  date: string;
}

const props = defineProps<{ widgetId: string }>();
const store = useDashboardStore();

const widget = computed(() => store.widgets.find((w) => w.id === props.widgetId));
const data = computed<ApodData | null>(() => (widget.value?.data as ApodData | null) ?? null);

onMounted(async () => {
  if (widget.value?.status === 'idle') {
    await store.fetchWidgetData(props.widgetId);
  }
});

function openImage() {
  if (data.value?.hdurl || data.value?.url) {
    window.open(data.value.hdurl || data.value.url, '_blank');
  }
}
</script>

<template>
  <Card class="flex h-full w-full flex-col overflow-hidden transition-all">
    <CardHeader class="pb-2">
      <div class="flex items-center justify-between">
        <CardTitle class="text-base font-medium md:text-lg lg:text-xl xl:text-2xl">
          NASA - Image du jour
        </CardTitle>
        <Icon name="simple-icons:nasa" class="text-primary h-10 w-10" />
      </div>
    </CardHeader>

    <CardContent class="relative flex-1 overflow-hidden px-6">
      <div v-if="widget?.status === 'loading'" class="flex h-full flex-col gap-2 p-3">
        <Skeleton class="h-full w-full rounded-md" />
        <Skeleton class="h-4 w-2/3" />
      </div>

      <template v-else-if="data">
        <div v-if="data.media_type === 'image'" class="relative h-full border">
          <img
            :src="data.url"
            :alt="data.title"
            class="h-full w-auto object-contain"
            loading="lazy" />
          <div
            class="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent p-3 pt-8">
            <p class="text-sm font-medium text-white">{{ data.title }}</p>
            <p class="text-xs text-white/80">{{ data.date }}</p>
          </div>
          <button
            class="absolute top-2 right-2 rounded-full bg-black/50 p-1.5 text-white/90 opacity-0 transition-opacity hover:bg-black/70 hover:text-white"
            :class="{ 'opacity-100': true }"
            @click="openImage">
            <LucideExternalLink class="h-3.5 w-3.5" />
          </button>
        </div>

        <div v-else-if="data.media_type === 'video'" class="flex h-full flex-col gap-2 p-3">
          <p class="text-sm font-medium">{{ data.title }}</p>
          <a :href="data.url" target="_blank" class="text-primary text-xs underline">
            Voir la vidéo
          </a>
          <p class="text-muted-foreground line-clamp-4 text-xs">{{ data.explanation }}</p>
        </div>
      </template>

      <div v-else class="text-muted-foreground flex h-full items-center justify-center text-xs">
        Aucune donnée disponible
      </div>
    </CardContent>
  </Card>
</template>
