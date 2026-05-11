import { toast } from 'vue-sonner';
import { dashboardExportSchema } from '~/utils/dashboard-schema';

export function useDashboardImportExport() {
  const store = useDashboardStore();

  function exportDashboard() {
    const payload = {
      schemaVersion: '1.0' as const,
      exportedAt: new Date().toISOString(),
      widgets: store.widgets.map((w) => ({
        id: w.id,
        type: w.type,
        config: w.config,
      })),
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pulse-dashboard-export-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success('Configuration exportée avec succès');
  }

  function parseAndValidate(jsonString: string): DashboardExport {
    let parsed: unknown;
    try {
      parsed = JSON.parse(jsonString);
    } catch {
      throw new Error('Le fichier JSON est malformé.');
    }

    const result = dashboardExportSchema.safeParse(parsed);
    if (!result.success) {
      const issues = result.error.issues.map((i) => i.message).join(', ');
      throw new Error(`Validation échouée : ${issues}`);
    }

    return result.data;
  }

  function importDashboard(jsonString: string, mode: 'replace' | 'merge') {
    const data = parseAndValidate(jsonString);

    const sanitizedWidgets: DashboardWidget[] = data.widgets.map((w) => ({
      ...w,
      status: 'idle' as const,
      data: {},
    }));

    const targetWidgets =
      mode === 'replace'
        ? sanitizedWidgets
        : sanitizedWidgets.map((w) => ({ ...w, id: crypto.randomUUID() }));

    if (mode === 'replace') {
      store.replaceWidgets(targetWidgets);
    } else {
      store.mergeWidgets(targetWidgets);
    }

    for (const w of targetWidgets) {
      store.fetchWidgetData(w.id);
    }

    toast.success(
      mode === 'replace' ? 'Dashboard remplacé avec succès' : 'Widgets fusionnés avec succès'
    );
  }

  return {
    exportDashboard,
    importDashboard,
  };
}
