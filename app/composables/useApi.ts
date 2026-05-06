import type { NitroFetchOptions } from 'nitropack';
import { toast } from 'vue-sonner';

export const useApi = async <T>(
  apiNameOrBaseUrl: 'weather' | 'geocoding' | 'crypto' | 'github' | string,
  endpoint: string,
  options?: NitroFetchOptions<any>
) => {
  const config = useRuntimeConfig();

  const baseUrl = apiNameOrBaseUrl.startsWith('http')
    ? apiNameOrBaseUrl
    : (config.public[`${apiNameOrBaseUrl}ApiBase` as keyof typeof config.public] as string);

  try {
    const data = await $fetch<T>(endpoint, {
      baseURL: baseUrl,
      ...options,

      onResponseError({ response }) {
        const status = response.status;
        const errorData = response._data;

        const message = errorData?.message || 'An unexpected error occurred';

        toast.error(`API Error (${status})`, {
          description: message,
        });
      },

      onResponse({ response }) {
        // TODO: log response for debugging
        console.log('Response:', response);
      },
    });

    return { data, error: null };
  } catch (err: any) {
    return { data: null, error: err };
  }
};
