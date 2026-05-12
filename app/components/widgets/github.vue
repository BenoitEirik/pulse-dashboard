<script setup lang="ts">
const props = defineProps<{ widgetId: string }>();
const store = useDashboardStore();

const widget = computed(() => store.widgets.find((w) => w.id === props.widgetId));
const profile = computed(() => widget.value?.data as GithubResponse | null);

onMounted(async () => {
  if (widget.value?.status === 'idle') {
    await store.fetchWidgetData(props.widgetId);
  }
});

const openProfile = () => {
  if (profile.value?.html_url) {
    window.open(profile.value.html_url, '_blank');
  }
};
</script>

<template>
  <Card class="size-full overflow-hidden transition-all">
    <div v-if="widget?.status === 'loading'" class="space-y-4 p-6">
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

    <div
      v-else-if="widget?.status === 'error'"
      class="flex h-full flex-col items-center justify-center space-y-2 p-6 text-center">
      <p class="text-sm font-medium">Erreur lors de la récupération</p>
      <Button variant="outline" size="sm" @click="store.fetchWidgetData(widgetId)"
        >Réessayer</Button
      >
    </div>

    <template v-else-if="profile">
      <CardHeader class="pb-4">
        <div class="flex items-center gap-4">
          <Avatar class="border-primary/10 h-16 w-16 border-2">
            <AvatarImage :src="profile.avatar_url" :alt="profile.login" />
            <AvatarFallback><LucideUser2 /></AvatarFallback>
          </Avatar>
          <div class="overflow-hidden">
            <CardTitle
              class="text-foreground truncate text-base font-medium md:text-lg lg:text-xl xl:text-2xl">
              {{ profile.name || profile.login }}
            </CardTitle>
            <p class="text-muted-foreground font-mono text-sm">@{{ profile.login }}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent class="flex-1 space-y-4">
        <p v-if="profile.bio" class="text-muted-foreground line-clamp-3 text-base leading-relaxed">
          {{ profile.bio }}
        </p>
        <p v-else class="text-muted-foreground/60 text-sm italic">Pas de bio renseignée.</p>

        <div class="border-border grid grid-cols-3 gap-3 border-y py-3">
          <div class="text-center">
            <p class="text-muted-foreground text-xs font-medium tracking-wider uppercase">Repos</p>
            <p class="mt-0.5 text-2xl font-bold">{{ profile.public_repos }}</p>
          </div>
          <div class="border-border border-x text-center">
            <p class="text-muted-foreground text-xs font-medium tracking-wider uppercase">
              Followers
            </p>
            <p class="mt-0.5 text-2xl font-bold">{{ profile.followers }}</p>
          </div>
          <div class="text-center">
            <p class="text-muted-foreground text-xs font-medium tracking-wider uppercase">Suivis</p>
            <p class="mt-0.5 text-2xl font-bold">{{ profile.following }}</p>
          </div>
        </div>

        <div v-if="profile.location" class="text-muted-foreground flex items-center gap-2 text-sm">
          <LucideMapPin class="h-4 w-4" />
          {{ profile.location }}
        </div>
      </CardContent>

      <CardFooter class="pt-0">
        <Button class="group w-full" variant="default" @click="openProfile">
          Voir le profil
          <LucideExternalLink
            class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Button>
      </CardFooter>
    </template>

    <div v-else class="text-muted-foreground flex h-full items-center justify-center text-xs">
      Aucune donnée disponible
    </div>
  </Card>
</template>
