import { z } from 'zod';
import { WIDGET_TYPES } from './widget-types';

export const widgetTypeSchema = z.union(
  WIDGET_TYPES.map((type) => z.literal(type)) as [
    z.ZodLiteral<string>,
    z.ZodLiteral<string>,
    ...z.ZodLiteral<string>[],
  ]
) as z.ZodType<WidgetType>;

export const widgetSchema = z.object({
  id: z.string().uuid(),
  type: widgetTypeSchema,
  config: z.object({
    apiName: widgetTypeSchema,
    endpoint: z.string(),
    params: z.record(z.any()).optional(),
    headers: z.record(z.string()).optional(),
  }),
});

export const dashboardExportSchema = z.object({
  schemaVersion: z.literal('1.0'),
  exportedAt: z.string().datetime().optional(),
  widgets: z.array(widgetSchema),
});

export type DashboardExport = z.infer<typeof dashboardExportSchema>;
