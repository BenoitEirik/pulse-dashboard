<script setup lang="ts">
const emit = defineEmits<{
  submit: [config: DashboardWidget['config']];
}>();

const mode = ref<'today' | 'random'>('today');

function submit() {
  const params: Record<string, any> = {
    api_key: 'DEMO_KEY',
  };

  if (mode.value === 'random') {
    params.count = 1;
  }

  emit('submit', {
    apiName: 'nasa-apod',
    endpoint: '/planetary/apod',
    params,
  });
}
</script>

<template>
  <div class="space-y-4">
    <div class="space-y-2">
      <Label>Mode</Label>
      <div class="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          :class="mode === 'today' && 'bg-primary text-primary-foreground hover:bg-primary/90'"
          @click="mode = 'today'">
          Aujourd'hui
        </Button>
        <Button
          variant="outline"
          size="sm"
          :class="mode === 'random' && 'bg-primary text-primary-foreground hover:bg-primary/90'"
          @click="mode = 'random'">
          Aléatoire
        </Button>
      </div>
    </div>

    <div class="flex justify-end pt-2">
      <Button @click="submit">Ajouter le widget</Button>
    </div>
  </div>
</template>
