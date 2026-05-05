<script setup lang="ts">
const emit = defineEmits<{
  submit: [config: DashboardWidget['config']];
}>();

const username = ref('');

function submit() {
  if (!username.value.trim()) return;

  emit('submit', {
    apiName: 'github',
    endpoint: `/users/${username.value.trim()}`,
    params: {},
  });
}
</script>

<template>
  <div class="space-y-4">
    <div class="space-y-2">
      <Label for="github-username">Nom d'utilisateur GitHub</Label>
      <div class="flex gap-2">
        <Input
          id="github-username"
          v-model="username"
          placeholder="Ex: torvalds..."
          @keydown.enter.prevent="submit" />
      </div>
    </div>

    <div v-if="username.trim()" class="bg-accent/50 rounded-md border p-3">
      <div class="flex items-center gap-2">
        <Icon name="simple-icons:github" class="text-primary h-4 w-4" />
        <span class="text-sm font-medium">@{{ username.trim() }}</span>
      </div>
    </div>

    <div class="flex justify-end pt-2">
      <Button :disabled="!username.trim()" @click="submit"> Ajouter le widget </Button>
    </div>
  </div>
</template>
