<script setup lang="ts">
import { toast } from 'vue-sonner';

const props = defineProps<{
  open: boolean;
}>();

const emit = defineEmits<{
  'update:open': [value: boolean];
}>();

const { exportDashboard, importDashboard } = useDashboardImportExport();

const importMode = ref<'replace' | 'merge'>('replace');
const jsonContent = ref('');
const fileName = ref<string | null>(null);
const fileInputRef = ref<HTMLInputElement | null>(null);

const canImport = computed(() => jsonContent.value.trim().length > 0);

function onOpenChange(open: boolean) {
  emit('update:open', open);
  if (!open) {
    resetForm();
  }
}

function resetForm() {
  jsonContent.value = '';
  fileName.value = null;
  importMode.value = 'replace';
  if (fileInputRef.value) {
    fileInputRef.value.value = '';
  }
}

function handleExport() {
  exportDashboard();
}

function handleFileSelect(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  fileName.value = file.name;
  const reader = new FileReader();
  reader.onload = (e) => {
    const text = e.target?.result;
    if (typeof text === 'string') {
      jsonContent.value = text;
    }
  };
  reader.readAsText(file);
}

function triggerFileInput() {
  fileInputRef.value?.click();
}

function handleImport() {
  try {
    importDashboard(jsonContent.value.trim(), importMode.value);
    emit('update:open', false);
    resetForm();
  } catch (error: any) {
    toast.error(error.message || "Erreur lors de l'import");
  }
}
</script>

<template>
  <Dialog :open="props.open" @update:open="onOpenChange">
    <DialogContent class="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>Paramètres du dashboard</DialogTitle>
        <DialogDescription>
          Exportez votre configuration ou importez-en une depuis un fichier JSON.
        </DialogDescription>
      </DialogHeader>

      <div class="space-y-6 py-4">
        <!-- Export -->
        <div class="space-y-3">
          <div class="flex items-center gap-2">
            <LucideDownload class="text-muted-foreground h-4 w-4" />
            <h3 class="text-sm font-medium">Exporter la configuration</h3>
          </div>
          <p class="text-muted-foreground text-xs">
            Téléchargez un fichier JSON contenant la liste et la configuration de vos widgets.
          </p>
          <Button variant="outline" size="sm" class="w-full" @click="handleExport">
            <LucideDownload class="mr-2 h-4 w-4" />
            Exporter en JSON
          </Button>
        </div>

        <Separator />

        <!-- Import -->
        <div class="space-y-3">
          <div class="flex items-center gap-2">
            <LucideUpload class="text-muted-foreground h-4 w-4" />
            <h3 class="text-sm font-medium">Importer une configuration</h3>
          </div>
          <p class="text-muted-foreground text-xs">
            Sélectionnez un fichier JSON ou collez son contenu ci-dessous.
          </p>

          <input
            ref="fileInputRef"
            type="file"
            accept="application/json,.json"
            class="hidden"
            @change="handleFileSelect" />

          <Button variant="outline" size="sm" class="w-full" @click="triggerFileInput">
            <LucideFileJson class="mr-2 h-4 w-4" />
            {{ fileName ? fileName : 'Choisir un fichier JSON' }}
          </Button>

          <textarea
            v-model="jsonContent"
            rows="4"
            placeholder="Ou collez le contenu JSON ici..."
            class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50" />

          <div class="space-y-2">
            <Label class="text-xs font-medium">Mode d'import</Label>
            <div class="flex gap-4">
              <label class="flex cursor-pointer items-center gap-2 text-sm">
                <input
                  v-model="importMode"
                  type="radio"
                  value="replace"
                  class="accent-primary h-4 w-4" />
                Remplacer
              </label>
              <label class="flex cursor-pointer items-center gap-2 text-sm">
                <input
                  v-model="importMode"
                  type="radio"
                  value="merge"
                  class="accent-primary h-4 w-4" />
                Fusionner
              </label>
            </div>
            <p class="text-muted-foreground text-xs">
              <span v-if="importMode === 'replace'">
                Le dashboard actuel sera entièrement remplacé par la configuration importée.
              </span>
              <span v-else>
                Les widgets importés seront ajoutés à la fin du dashboard actuel.
              </span>
            </p>
          </div>

          <Button size="sm" class="w-full" :disabled="!canImport" @click="handleImport">
            <LucideUpload class="mr-2 h-4 w-4" />
            Importer
          </Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
