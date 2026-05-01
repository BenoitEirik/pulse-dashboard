<script setup lang="ts">
import { WIDGET_COMPONENTS } from '~/utils/widget-registry'

const props = defineProps<{ widgetId: string }>()
const store = useDashboardStore()

const widget = computed(() => store.widgets.find(w => w.id === props.widgetId))
const component = computed(() => widget.value ? WIDGET_COMPONENTS[widget.value.type] : null)

const remove = () => store.removeWidget(props.widgetId)
</script>

<template>
  <div class="group relative h-full w-full">
    <div class="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
      <Button variant="secondary" size="icon" class="h-8 w-8 shadow-md">
        <LucideSettings2 class="h-4 w-4" />
      </Button>
      <Button variant="destructive" size="icon" class="h-8 w-8 shadow-md" @click="remove">
        <LucideTrash2 class="h-4 w-4" />
      </Button>
    </div>

    <div class="absolute top-2 left-2 z-10 opacity-0 group-hover:opacity-100 cursor-grab active:cursor-grabbing">
      <LucideGripVertical class="h-4 w-4 text-muted-foreground" />
    </div>

    <component 
      :is="component" 
      v-if="component" 
      :widget-id="widgetId" 
    />
    
    <Card v-else class="h-full flex items-center justify-center border-dashed">
      <p class="text-xs text-muted-foreground">Type de widget inconnu : {{ widget?.type }}</p>
    </Card>
  </div>
</template>