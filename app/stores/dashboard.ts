import { toast } from 'vue-sonner';

export const useDashboardStore = defineStore(
  'dashboard',
  () => {
    const widgets = ref<DashboardWidget[]>([]);

    async function fetchWidgetData(widgetId: string) {
      console.info('Fetching widget data for', widgetId);
      const widget = widgets.value.find((w) => w.id === widgetId);
      if (!widget) {
        toast.error('Widget not found');
        return;
      }

      widget.status = 'loading';

      const { data, error } = await useApi(widget.config.apiName, widget.config.endpoint, {
        method: 'GET',
        query: widget.config.params,
        headers: widget.config.headers,
      });

      if (error) {
        widget.status = 'error';
      } else {
        widget.status = 'success';
        console.info('Widget data fetched', data);
        widget.data = data as Record<string, any>;
      }
    }

    function addWidget(type: WidgetType, config: DashboardWidget['config']) {
      const newWidget: DashboardWidget = {
        id: crypto.randomUUID(),
        type,
        config,
        status: 'idle',
        data: {},
      };
      widgets.value.push(newWidget);
    }

    function removeWidget(widgetId: string) {
      widgets.value = widgets.value.filter((w) => w.id !== widgetId);
    }

    function moveWidget(fromIndex: number, toIndex: number) {
      const widget = widgets.value.splice(fromIndex, 1)[0];
      if (widget) {
        widgets.value.splice(toIndex, 0, widget);
      } else {
        toast.error('Widget not found');
      }
    }

    return {
      widgets,
      fetchWidgetData,
      addWidget,
      removeWidget,
      moveWidget,
    };
  },
  {
    persist: {
      key: 'persisted-dashboardStore-v1.0',
      storage: piniaPluginPersistedstate.localStorage(),
      pick: ['widgets'],
    },
  }
);

const widgetComponents = {
  weather: 'WeatherWidget',
  crypto: 'CryptoWidget',
};
