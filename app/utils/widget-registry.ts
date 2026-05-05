import WidgetLoading from '@/components/WidgetLoading.vue';
import WidgetError from '@/components/WidgetError.vue';

const modules = import.meta.glob<Component>('@/components/widgets/*.vue');

export const WIDGET_COMPONENTS: Record<string, Component> = Object.freeze(
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

// Avoid to import manually each widget config component like:
// export const WIDGET_COMPONENTS: Record<string, Component> = {
//   weather: defineAsyncComponent(() => import('@/components/widgets/weather.vue')),
// };

// NB: Registry is better than function to prevent reimport same component multiple times
//     We use CAPITAL to indicate it's a registry and it's an immutable constant
//     We use flat-Map pattern to filter out empty widgetType
