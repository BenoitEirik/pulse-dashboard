<script setup lang="ts">
const props = defineProps<{ widgetId: string }>();
const store = useDashboardStore();

const widget = computed(() => store.widgets.find((w) => w.id === props.widgetId));
const config = computed(() => widget.value?.config?.params);

const iframeUrl = computed(() => {
  const proper = config.value?.proper ?? 'roman';
  const pal = config.value?.pal ?? false;

  let url = `https://theochrone.fr/spill/main?page=day&proper=${proper}`;

  if (pal) {
    url += '&pal=on';
  }

  return url;
});
</script>

<template>
  <Card class="flex h-full w-full flex-col overflow-hidden transition-all">
    <CardHeader class="pb-2">
      <div class="flex items-center justify-between">
        <CardTitle class="text-base font-medium md:text-lg lg:text-xl xl:text-2xl">
          Théochrone
        </CardTitle>
        <Icon name="lucide:calendar-days" class="text-primary h-5 w-5" />
      </div>
    </CardHeader>

    <CardContent class="relative h-fit flex-1 overflow-hidden px-3 py-0">
      <iframe
        :src="iframeUrl"
        title="Théochrone"
        class="h-full w-full border-0"
        sandbox="allow-scripts allow-same-origin" />
    </CardContent>
  </Card>
</template>
