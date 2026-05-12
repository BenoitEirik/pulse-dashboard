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
  <div class="flex flex-col space-y-6 p-6 lg:space-y-10 lg:p-10">
    <div class="flex w-full shrink-0 justify-end">
      <Button variant="outline" size="default" @click="openCatalog"
        ><LucidePlus class="h-4 w-4" /><span>Ajouter un widget</span></Button
      >
    </div>

    <div
      ref="gridRef"
      class="grid h-full grid-cols-1 gap-6 overflow-y-auto lg:grid-cols-2 lg:gap-8 2xl:grid-cols-3 2xl:gap-10">
      <WidgetShell
        v-for="widget in store.widgets"
        :key="widget.id"
        class="widget-item"
        :widget-id="widget.id" />

      <button
        class="border-border hover:border-primary/30 hover:bg-accent/50 group flex min-h-[240px] flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all"
        @click="openCatalog">
        <div
          class="bg-primary/10 text-primary group-hover:bg-primary/20 rounded-full p-3 transition-all group-hover:scale-110">
          <lucidePlus class="h-6 w-6" />
        </div>
        <span class="text-muted-foreground mt-3 text-sm font-medium">Ajouter un widget</span>
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
  opacity: 0.35;
  background-color: hsl(var(--primary) / 0.15);
  border-radius: 0.75rem;
  outline: 2px dashed hsl(var(--primary) / 0.3);
  outline-offset: 2px;
}
:deep(.sortable-drag) {
  opacity: 1;
  box-shadow:
    0 20px 25px -5px rgb(0 0 0 / 0.15),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
  border-radius: 0.75rem;
  transform: scale(1.02);
}
</style>
