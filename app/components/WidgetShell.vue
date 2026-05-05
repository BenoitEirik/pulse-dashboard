<script setup lang="ts">
const props = defineProps<{ widgetId: string }>();
const store = useDashboardStore();

const widget = computed(() => store.widgets.find((w) => w.id === props.widgetId));
const component = computed(() => (widget.value ? WIDGET_COMPONENTS[widget.value.type] : null));

const remove = () => store.removeWidget(props.widgetId);
</script>

<template>
  <div class="group relative h-full w-full">
    <div
      class="absolute top-2 right-2 z-10 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
      <Button variant="secondary" size="icon" class="h-8 w-8 shadow-md">
        <LucideSettings2 class="h-4 w-4" />
      </Button>
      <Button variant="destructive" size="icon" class="h-8 w-8 shadow-md" @click="remove">
        <LucideTrash2 class="h-4 w-4" />
      </Button>
    </div>

    <div
      class="absolute top-2 left-2 z-10 cursor-grab opacity-0 group-hover:opacity-100 active:cursor-grabbing">
      <LucideGripVertical class="text-muted-foreground h-4 w-4" />
    </div>

    <component :is="component" v-if="component" :widget-id="widgetId" />

    <Card v-else class="flex h-full items-center justify-center border-dashed">
      <p class="text-muted-foreground text-xs">Type de widget inconnu : {{ widget?.type }}</p>
    </Card>
  </div>
</template>
