<script setup lang="ts">
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  type ChartOptions,
  type ChartData,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler);

const props = defineProps<{ widgetId: string }>();
const store = useDashboardStore();

const widget = computed(() => store.widgets.find((w) => w.id === props.widgetId));
const rawData = computed(() => widget.value?.data as CryptoHistoryResponse | null);

const chartData = computed<ChartData<'line'>>(() => {
  if (!rawData.value?.prices) return { labels: [], datasets: [] };

  const primaryColor = getCssVariable('--primary');

  const prices = rawData.value.prices.map((p) => p[1]);
  const labels = rawData.value.prices.map((p) => {
    return new Date(p[0]).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  });

  return {
    labels,
    datasets: [
      {
        label: 'Prix',
        data: prices,
        fill: true,
        borderColor: primaryColor,
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            // Cela peut arriver au premier rendu
            return 'transparent';
          }
          return createTopBottomGradient(ctx, chartArea);
        },
        tension: 0.4,
        pointRadius: 0,
        pointHitRadius: 20,
        borderWidth: 2,
      },
    ],
  };
});

const chartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      mode: 'index',
      intersect: false,
    },
  },
  scales: {
    x: { display: false },
    y: { display: false },
  },
};

onMounted(async () => {
  if (widget.value?.status === 'idle') {
    await store.fetchWidgetData(props.widgetId);
  }
});

const getCssVariable = (name: string) => {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
};

const createTopBottomGradient = (ctx: CanvasRenderingContext2D, area: any) => {
  const primaryValue = getCssVariable('--primary');
  const gradient = ctx.createLinearGradient(0, area.top, 0, area.bottom);

  // 0 : Le haut (On augmente l'opacité ici)
  // transparent 30% signifie que la couleur est visible à 70%
  gradient.addColorStop(0, `color-mix(in srgb, ${primaryValue}, transparent 30%)`);

  // 0.5 : Le milieu (On force la couleur à tenir jusqu'à la moitié)
  gradient.addColorStop(0.6, `color-mix(in srgb, ${primaryValue}, transparent 80%)`);

  // 1 : Le bas (Totalement invisible)
  gradient.addColorStop(1, `color-mix(in srgb, ${primaryValue}, transparent 100%)`);

  return gradient;
};
</script>

<template>
  <Card class="flex h-full w-full flex-col overflow-hidden transition-all">
    <CardHeader>
      <div class="flex items-center justify-between">
        <CardTitle class="text-base font-medium md:text-lg lg:text-xl xl:text-2xl">
          Crypto
        </CardTitle>
        <div v-if="rawData?.prices?.length" class="font-mono text-lg font-bold">
          {{ rawData.prices?.[rawData.prices.length - 1]?.[1]?.toLocaleString() }} €
        </div>
      </div>
    </CardHeader>

    <CardContent class="size-full">
      <div v-if="widget?.status === 'loading'" class="size-full">
        <Skeleton
          v-for="i in 12"
          :key="i"
          :style="{ height: `${20 + Math.random() * 60}%` }"
          class="flex-1" />
      </div>

      <div v-else-if="rawData?.prices?.length" class="size-full">
        <Line :data="chartData" :options="chartOptions" />
      </div>

      <div v-else class="text-muted-foreground flex size-full items-center justify-center text-xs">
        Aucune donnée disponible
      </div>
    </CardContent>
  </Card>
</template>
