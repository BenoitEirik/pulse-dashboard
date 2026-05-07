<script setup lang="ts">
const props = defineProps<{
  open: boolean;
  widgetType: WidgetType | null;
  widgetId: string | null;
}>();

const emit = defineEmits<{
  'update:open': [value: boolean];
}>();

const store = useDashboardStore();

const isEditing = computed(() => !!props.widgetId);

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
  if (isEditing.value && props.widgetId) {
    store.updateWidget(props.widgetId, config);
  } else {
    store.addWidget(props.widgetType, config);
  }
  emit('update:open', false);
}

function onOpenChange(open: boolean) {
  emit('update:open', open);
}
</script>

<template>
  <Dialog :open="props.open" @update:open="onOpenChange">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {{ isEditing ? 'Modifier' : 'Ajouter' }} — {{ widgetInfo?.name || 'Configuration' }}
        </DialogTitle>
        <DialogDescription>
          {{ widgetInfo?.description || '' }}
        </DialogDescription>
      </DialogHeader>

      <div class="py-4">
        <component
          :is="configComponent"
          v-if="configComponent"
          :mode="isEditing ? 'edit' : 'create'"
          @submit="onSubmit" />
        <p v-else class="text-muted-foreground text-center text-sm">
          Impossible de configurer ce widget.
        </p>
      </div>
    </DialogContent>
  </Dialog>
</template>
