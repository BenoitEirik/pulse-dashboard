<script setup lang="ts">
const props = defineProps<{ widgetId: string }>()
const store = useDashboardStore()

const widget = computed(() => store.widgets.find(w => w.id === props.widgetId))
const profile = computed(() => widget.value?.data as GithubResponse | null)

onMounted(async () => {
  if (widget.value?.status === 'idle') {
    await store.fetchWidgetData(props.widgetId)
  }
})

const openProfile = () => {
  if (profile.value?.html_url) {
    window.open(profile.value.html_url, '_blank')
  }
}
</script>

<template>
  <Card class="overflow-hidden size-full transition-all">
    <div v-if="widget?.status === 'loading'" class="p-6 space-y-4">
      <div class="flex items-center gap-4">
        <Skeleton class="h-16 w-16 rounded-full" />
        <div class="space-y-2">
          <Skeleton class="h-4 w-32" />
          <Skeleton class="h-3 w-24" />
        </div>
      </div>
      <Skeleton class="h-12 w-full" />
      <div class="flex justify-between gap-2">
        <Skeleton class="h-8 flex-1" />
        <Skeleton class="h-8 flex-1" />
        <Skeleton class="h-8 flex-1" />
      </div>
    </div>

    <div v-else-if="widget?.status === 'error'" class="p-6 flex flex-col items-center justify-center h-full text-center space-y-2">
      <p class="text-sm font-medium">Erreur lors de la récupération</p>
      <Button variant="outline" size="sm" @click="store.fetchWidgetData(widgetId)">Réessayer</Button>
    </div>

    <template v-else-if="profile">
      <CardHeader class="pb-4">
        <div class="flex items-center gap-4">
          <Avatar class="h-16 w-16 border-2 border-primary/10">
            <AvatarImage :src="profile.avatar_url" :alt="profile.login" />
            <AvatarFallback>{{ profile.login.slice(0, 2).toUpperCase() }}</AvatarFallback>
          </Avatar>
          <div class="overflow-hidden">
            <CardTitle class="text-base font-medium truncate text-foreground md:text-lg lg:text-xl xl:text-2xl">
              {{ profile.name || profile.login }}
            </CardTitle>
            <p class="text-sm text-muted-foreground font-mono">@{{ profile.login }}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent class="space-y-4 flex-1">
        <p v-if="profile.bio" class="text-base text-muted-foreground leading-relaxed line-clamp-3">
          {{ profile.bio }}
        </p>
        <p v-else class="text-sm italic text-muted-foreground/60">Pas de bio renseignée.</p>

        <div class="grid grid-cols-3 gap-2 py-2 border-y border-border/40">
          <div class="text-center">
            <p class="text-base text-muted-foreground tracking-tight">Repos</p>
            <Badge variant="secondary" class="mt-1 font-bold">{{ profile.public_repos }}</Badge>
          </div>
          <div class="text-center border-x border-border/40">
            <p class="text-base text-muted-foreground tracking-tight">Followers</p>
            <span class="text-sm font-bold block mt-1">{{ profile.followers }}</span>
          </div>
          <div class="text-center">
            <p class="text-base text-muted-foreground tracking-tight">Suivis</p>
            <span class="text-sm font-bold block mt-1">{{ profile.following }}</span>
          </div>
        </div>

        <div v-if="profile.location" class="flex items-center gap-2 text-sm text-muted-foreground">
          <LucideMapPin class="h-4 w-4" />
          {{ profile.location }}
        </div>
      </CardContent>

      <CardFooter class="pt-0">
        <Button class="w-full group" variant="default" @click="openProfile">
          Voir le profil
          <LucideExternalLink class="ml-2 h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Button>
      </CardFooter>
    </template>

    <div v-else class="h-full flex items-center justify-center text-xs text-muted-foreground">
      Aucune donnée disponible
    </div>
  </Card>
</template>