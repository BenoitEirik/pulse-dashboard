<script setup lang="ts">
const store = useDashboardStore();
const isCatalogOpen = ref(false);
const isConfigDialogOpen = ref(false);
const selectedWidgetType = ref<WidgetType | null>(null);

function openCatalog() {
  isCatalogOpen.value = true;
}

function closeCatalog() {
  isCatalogOpen.value = false;
}

function onWidgetSelect(type: WidgetType) {
  closeCatalog();
  selectedWidgetType.value = type;
  isConfigDialogOpen.value = true;
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
      class="grid grid-cols-1 gap-4 overflow-y-auto lg:grid-cols-2 lg:gap-6 2xl:grid-cols-3 h-full">
      <WidgetShell v-for="widget in store.widgets" :key="widget.id" :widget-id="widget.id" />

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

        <WidgetCatalog @close="closeCatalog" @select="onWidgetSelect" />
      </SheetContent>
    </Sheet>

    <WidgetConfigDialog
      v-model:open="isConfigDialogOpen"
      :widget-type="selectedWidgetType"
    />
  </div>
</template>
