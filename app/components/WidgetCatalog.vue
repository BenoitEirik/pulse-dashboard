<script setup lang="ts">
const emit = defineEmits<{
  close: [];
  select: [type: WidgetType];
}>();

function selectWidget(widget: WidgetCatalogItem) {
  emit('select', widget.type);
}
</script>

<template>
  <div class="flex h-full flex-1 flex-col space-y-4 overflow-y-auto">
    <div class="flex-1 space-y-4 px-4">
      <div
        v-for="widget in WIDGET_CATALOG"
        :key="widget.type"
        class="hover:bg-accent/50 group flex cursor-pointer items-center justify-between gap-3 rounded-lg border p-4 transition-colors"
        @click="selectWidget(widget)">
        <div class="flex items-center gap-3">
          <div
            class="bg-primary/10 text-primary flex aspect-square h-12 w-12 items-center justify-center self-start rounded-lg transition-transform group-hover:scale-110">
            <Icon :name="widget.icon" class="h-6 w-6" />
          </div>
          <div>
            <h4 class="font-medium">{{ widget.name }}</h4>
            <p class="text-muted-foreground text-sm">{{ widget.description }}</p>
          </div>
        </div>

        <div class="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <LucidePlus class="h-4 w-4" />
        </div>
      </div>
    </div>

    <div class="shrink-0 border-t p-4 text-center">
      <p class="text-muted-foreground text-xs">Plus de widgets seront bientôt disponibles</p>
    </div>
  </div>
</template>
