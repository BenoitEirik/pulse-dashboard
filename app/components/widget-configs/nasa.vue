<script setup lang="ts">
const props = defineProps<{
  mode?: 'create' | 'edit';
}>();

const emit = defineEmits<{
  submit: [config: DashboardWidget['config']];
}>();

const apodMode = ref<'today' | 'random'>('today');

function submit() {
  const params: Record<string, any> = {
    api_key: useRuntimeConfig().public.nasaApiKey || 'DEMO_KEY', // DEMO_KEY is public but rate limited
  };

  if (apodMode.value === 'random') {
    params.count = 1;
  }

  emit('submit', {
    apiName: 'nasa',
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
          :class="apodMode === 'today' && 'bg-primary text-primary-foreground hover:bg-primary/90'"
          @click="apodMode = 'today'">
          Aujourd'hui
        </Button>
        <Button
          variant="outline"
          size="sm"
          :class="apodMode === 'random' && 'bg-primary text-primary-foreground hover:bg-primary/90'"
          @click="apodMode = 'random'">
          Aléatoire
        </Button>
      </div>
    </div>

    <div class="flex justify-end pt-2">
      <Button @click="submit">
        {{ props.mode === 'edit' ? 'Enregistrer' : 'Ajouter le widget' }}
      </Button>
    </div>
  </div>
</template>
