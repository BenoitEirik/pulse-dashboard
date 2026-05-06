type WidgetType = 'weather' | 'crypto' | 'github' | 'tmdb' | 'flags' | 'theochrone' | 'nasa-apod';

interface DashboardWidget {
  id: string;
  type: WidgetType;
  config: {
    apiName: WidgetType;
    endpoint: string;
    params?: Record<string, any>;
    headers?: Record<string, string>;
  };
  status: 'idle' | 'loading' | 'success' | 'error';
  data: Record<string, any>;
}
