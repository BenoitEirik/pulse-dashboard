<script setup lang="ts">
const props = defineProps<{
  open: boolean;
  widgetType: WidgetType | null;
}>();

const emit = defineEmits<{
  'update:open': [value: boolean];
}>();

const store = useDashboardStore();

const widgetInfo = computed(() => {
  if (!props.widgetType) return null;
  return WIDGET_CATALOG.find((w) => w.type === props.widgetType) ?? null;
});

const configComponent = computed(() => {
  if (!props.widgetType) return null;
  return WIDGET_CONFIG_COMPONENTS[props.widgetType] || null;
});

function onSubmit(config: DashboardWidget['config']) {
  if (!props.widgetType) return;
  store.addWidget(props.widgetType, config);
  emit('update:open', false);
}
</script>

<template>
  <Dialog :open="props.open" @update:open="emit('update:open', $event)">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {{ widgetInfo?.name || 'Configuration' }}
        </DialogTitle>
        <DialogDescription>
          {{ widgetInfo?.description || '' }}
        </DialogDescription>
      </DialogHeader>

      <div class="py-4">
        <component :is="configComponent" v-if="configComponent" @submit="onSubmit" />
        <p v-else class="text-muted-foreground text-center text-sm">
          Impossible de configurer ce widget.
        </p>
      </div>
    </DialogContent>
  </Dialog>
</template>
