import { WIDGET_TYPES } from '~/utils/widget-types';

declare global {
  type WidgetType = (typeof WIDGET_TYPES)[number];
}
