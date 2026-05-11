<script setup lang="ts">
import { useSortable } from '@vueuse/integrations/useSortable';

const store = useDashboardStore();
const isCatalogOpen = ref(false);
const selectedWidgetType = ref<WidgetType | null>(null);
const gridRef = ref<HTMLElement | null>(null);

useSortable(gridRef, store.widgets, {
  animation: 150,
  handle: '.drag-handle',
  draggable: '.widget-item',
});

const { editingWidgetId, closeEditor } = useWidgetEditor();

const editingWidgetType = computed<WidgetType | null>(() => {
  if (!editingWidgetId.value) return null;
  const widget = store.widgets.find((w) => w.id === editingWidgetId.value);
  return widget?.type ?? null;
});

const dialogWidgetType = computed<WidgetType | null>(() => {
  if (editingWidgetId.value) return editingWidgetType.value;
  return selectedWidgetType.value;
});

const isConfigDialogOpen = computed({
  get: () => !!selectedWidgetType.value || !!editingWidgetId.value,
  set: (val) => {
    if (!val) {
      selectedWidgetType.value = null;
      closeEditor();
    }
  },
});

function openCatalog() {
  isCatalogOpen.value = true;
}

function closeCatalog() {
  isCatalogOpen.value = false;
}

function onCatalogSelect(type: WidgetType) {
  closeCatalog();
  selectedWidgetType.value = type;
}
</script>

<template>
  <div class="flex flex-col space-y-4 p-4 lg:space-y-8 lg:p-8">
    <div class="flex w-full shrink-0 justify-end">
      <Button variant="outline" size="sm" @click="openCatalog"
        ><LucidePlus /><span>Ajouter un widget</span></Button
      >
    </div>

    <div
      ref="gridRef"
      class="grid h-full grid-cols-1 gap-4 overflow-y-auto lg:grid-cols-2 lg:gap-6 2xl:grid-cols-3">
      <WidgetShell
        v-for="widget in store.widgets"
        :key="widget.id"
        class="widget-item"
        :widget-id="widget.id" />

      <button
        class="border-border hover:bg-accent/50 group flex min-h-[200px] flex-col items-center justify-center rounded-xl border-2 border-dashed transition-colors"
        @click="openCatalog">
        <div
          class="bg-primary/10 text-primary rounded-full p-3 transition-transform group-hover:scale-110">
          <lucidePlus class="h-6 w-6" />
        </div>
        <span class="text-muted-foreground mt-2 text-sm font-medium">Ajouter un widget</span>
      </button>
    </div>

    <Sheet v-model:open="isCatalogOpen">
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Catalogue de widgets</SheetTitle>
          <SheetDescription> Choisissez un widget à ajouter à votre dashboard </SheetDescription>
        </SheetHeader>

        <WidgetCatalog @close="closeCatalog" @select="onCatalogSelect" />
      </SheetContent>
    </Sheet>

    <WidgetConfigDialog
      v-model:open="isConfigDialogOpen"
      :widget-type="dialogWidgetType"
      :widget-id="editingWidgetId" />
  </div>
</template>

<style scoped>
:deep(.sortable-ghost) {
  opacity: 0.4;
  background-color: hsl(var(--accent));
  border-radius: 0.75rem;
}
:deep(.sortable-drag) {
  opacity: 1;
  box-shadow:
    0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1);
  border-radius: 0.75rem;
}
</style>
