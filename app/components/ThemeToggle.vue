<script setup lang="ts">
const colorMode = useColorMode();

const isDark = computed(() => colorMode.value === "dark");
</script>

<template>
  <Button
    variant="ghost"
    size="icon"
    @click="
      colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
    "
    class="transition-colors hover:bg-accent hover:text-accent-foreground"
    aria-label="Toggle theme"
  >
    <span class="relative w-5 h-5">
      <LucideMoon
        class="absolute top-1/2 left-1/2 w-5 h-5 transition-all duration-300 scale-100 rotate-0 -translate-x-1/2 -translate-y-1/2 dark:-rotate-90 dark:scale-0"
      />
      <LucideSun
        class="absolute top-1/2 left-1/2 w-5 h-5 transition-all duration-300 scale-0 rotate-90 -translate-x-1/2 -translate-y-1/2 dark:rotate-0 dark:scale-100"
      />
    </span>
  </Button>
</template>
