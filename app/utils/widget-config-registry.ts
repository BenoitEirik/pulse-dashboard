import WidgetLoading from '@/components/WidgetLoading.vue';
import WidgetError from '@/components/WidgetError.vue';

const modules = import.meta.glob<Component>('@/components/widget-configs/*.vue');

export const WIDGET_CONFIG_COMPONENTS: Record<string, Component> = Object.freeze(
  Object.fromEntries(
    Object.entries(modules).flatMap(([path, loader]) => {
      const widgetType: WidgetType = path.split('/').pop()!.replace('.vue', '') as WidgetType;

      if (!widgetType) return [];

      const component = defineAsyncComponent({
        loader,
        loadingComponent: WidgetLoading,
        errorComponent: WidgetError,
        delay: 200,
        timeout: 3000,
      });

      return [[widgetType, component]];
    })
  )
);
