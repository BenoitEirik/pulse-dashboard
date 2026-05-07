<script setup lang="ts">
const props = defineProps<{
  mode?: 'create' | 'edit';
}>();

const emit = defineEmits<{
  submit: [config: DashboardWidget['config']];
}>();

const proper = ref('roman');
const pal = ref(false);

const properOptions = [
  { value: 'american', label: 'Américain' },
  { value: 'australian', label: 'Australien' },
  { value: 'brazilian', label: 'Brésilien' },
  { value: 'canadian', label: 'Canadien' },
  { value: 'english', label: 'Anglais' },
  { value: 'french', label: 'Français' },
  { value: 'newzealander', label: 'Néo-Zélandais' },
  { value: 'polish', label: 'Polonais' },
  { value: 'portuguese', label: 'Portugais' },
  { value: 'roman', label: 'Romain' },
  { value: 'scottish', label: 'Écossais' },
  { value: 'strasburger', label: 'Strasbourgeois' },
  { value: 'welsh', label: 'Gallois' },
];

function submit() {
  emit('submit', {
    apiName: 'theochrone',
    endpoint: '',
    params: {
      proper: proper.value,
      pal: pal.value,
    },
  });
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center gap-2">
      <Checkbox id="pal" v-model:checked="pal" />
      <Label for="pal" class="cursor-pointer text-sm">Inclure les messes Pro Aliquibus Locis</Label>
    </div>

    <div class="space-y-2">
      <Label for="proper">Propre</Label>
      <select
        id="proper"
        v-model="proper"
        class="border-input bg-background ring-offset-background focus-visible:ring-ring placeholder:text-muted-foreground flex h-9 w-full rounded-md border px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">
        <option v-for="option in properOptions" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>

    <div class="flex justify-end pt-2">
      <Button @click="submit">
        {{ props.mode === 'edit' ? 'Enregistrer' : 'Ajouter le widget' }}
      </Button>
    </div>
  </div>
</template>
