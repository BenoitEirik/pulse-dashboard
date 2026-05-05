<script setup lang="ts">
interface CoinGeckoSearchResult {
  id: string;
  name: string;
  symbol: string;
  market_cap_rank: number | null;
  thumb: string;
}

const emit = defineEmits<{
  submit: [config: DashboardWidget['config']];
}>();

const searchQuery = ref('');
const results = ref<CoinGeckoSearchResult[]>([]);
const isLoading = ref(false);
const selectedCoin = ref<CoinGeckoSearchResult | null>(null);

async function searchCoin() {
  if (!searchQuery.value.trim()) return;
  isLoading.value = true;
  const { data, error } = await useApi<{ coins: CoinGeckoSearchResult[] }>('crypto', '/search', {
    query: {
      query: searchQuery.value,
    },
  });
  if (error || !data) {
    results.value = [];
  } else {
    results.value = data.coins.slice(0, 5);
  }
  isLoading.value = false;
}

function selectCoin(coin: CoinGeckoSearchResult) {
  selectedCoin.value = coin;
  results.value = [];
  searchQuery.value = `${coin.name} (${coin.symbol.toUpperCase()})`;
}

function submit() {
  if (!selectedCoin.value) return;

  emit('submit', {
    apiName: 'crypto',
    endpoint: `/coins/${selectedCoin.value.id}/market_chart`,
    params: {
      vs_currency: 'eur',
      days: '1',
      x_cg_demo_api_key: useRuntimeConfig().public.coingeckoApiKey,
    },
  });
}
</script>

<template>
  <div class="space-y-4">
    <div class="space-y-2">
      <Label for="coin-search">Rechercher une cryptomonnaie</Label>
      <div class="flex gap-2">
        <Input
          id="coin-search"
          v-model="searchQuery"
          placeholder="Ex: Bitcoin, Ethereum, Solana..."
          @keydown.enter.prevent="searchCoin" />
        <Button variant="secondary" :disabled="isLoading" @click="searchCoin">
          <LucideSearch v-if="!isLoading" class="h-4 w-4" />
          <span
            v-else
            class="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        </Button>
      </div>
    </div>

    <div v-if="results.length > 0" class="space-y-2">
      <p class="text-muted-foreground text-xs">Résultats</p>
      <div class="space-y-1">
        <button
          v-for="coin in results"
          :key="coin.id"
          class="hover:bg-accent flex w-full items-center gap-3 rounded-md border p-3 text-left transition-colors"
          @click="selectCoin(coin)">
          <img :src="coin.thumb" :alt="coin.name" class="h-6 w-6 shrink-0 rounded-full" />
          <div class="flex-1">
            <p class="text-sm font-medium">{{ coin.name }}</p>
            <p class="text-muted-foreground text-xs">{{ coin.symbol.toUpperCase() }}</p>
          </div>
          <LucideCheck v-if="selectedCoin?.id === coin.id" class="text-primary h-4 w-4" />
        </button>
      </div>
    </div>

    <div
      v-else-if="searchQuery && !isLoading && !selectedCoin"
      class="text-muted-foreground text-center text-sm">
      Aucun résultat
    </div>

    <div v-if="selectedCoin" class="bg-accent/50 rounded-md border p-3">
      <div class="flex items-center gap-2">
        <LucideBitcoin class="text-primary h-4 w-4" />
        <span class="text-sm font-medium">{{ selectedCoin.name }}</span>
      </div>
      <p class="text-muted-foreground text-xs">
        {{ selectedCoin.symbol.toUpperCase() }}
      </p>
    </div>

    <div class="flex justify-end pt-2">
      <Button :disabled="!selectedCoin" @click="submit"> Ajouter le widget </Button>
    </div>
  </div>
</template>
