<script setup lang="ts">
const emit = defineEmits<{
  submit: [config: DashboardWidget['config']];
}>();

const mediaType = ref<'all' | 'movie' | 'tv'>('movie');
const timeWindow = ref<'day' | 'week'>('day');

function submit() {
  const token = useRuntimeConfig().public.tmdbAccessToken;

  console.log('TMDB token:', token);

  emit('submit', {
    apiName: 'tmdb',
    endpoint: `/trending/${mediaType.value}/${timeWindow.value}`,
    params: {
      language: 'fr-FR',
    },
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : undefined,
  });
}
</script>

<template>
  <div class="space-y-4">
    <div class="space-y-2">
      <Label>Type de contenu</Label>
      <div class="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          :class="mediaType === 'movie' && 'bg-primary text-primary-foreground hover:bg-primary/90'"
          @click="mediaType = 'movie'">
          Films
        </Button>
        <Button
          variant="outline"
          size="sm"
          :class="mediaType === 'tv' && 'bg-primary text-primary-foreground hover:bg-primary/90'"
          @click="mediaType = 'tv'">
          Séries
        </Button>
        <Button
          variant="outline"
          size="sm"
          :class="mediaType === 'all' && 'bg-primary text-primary-foreground hover:bg-primary/90'"
          @click="mediaType = 'all'">
          Tout
        </Button>
      </div>
    </div>

    <div class="space-y-2">
      <Label>Période</Label>
      <div class="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          :class="timeWindow === 'day' && 'bg-primary text-primary-foreground hover:bg-primary/90'"
          @click="timeWindow = 'day'">
          Aujourd'hui
        </Button>
        <Button
          variant="outline"
          size="sm"
          :class="timeWindow === 'week' && 'bg-primary text-primary-foreground hover:bg-primary/90'"
          @click="timeWindow = 'week'">
          Cette semaine
        </Button>
      </div>
    </div>

    <div class="flex justify-end pt-2">
      <Button @click="submit">Ajouter le widget</Button>
    </div>
  </div>
</template>
