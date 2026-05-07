const editingWidgetId = ref<string | null>(null);

export function useWidgetEditor() {
  return {
    editingWidgetId: readonly(editingWidgetId),
    openEditor: (id: string) => { editingWidgetId.value = id; },
    closeEditor: () => { editingWidgetId.value = null; },
  };
}
