type WidgetType = 'weather' | 'crypto' | 'github';

interface DashboardWidget {
  id: string;
  type: WidgetType;
  config: {
    apiName: WidgetType;
    endpoint: string;
    params?: Record<string, any>;
  };
  status: 'idle' | 'loading' | 'success' | 'error';
  data: Record<string, any>;
}
