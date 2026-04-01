import { type NitroFetchOptions } from 'nitropack';
import { toast } from 'vue-sonner';

export const useApi = async <T>(
  apiName: 'weather' | 'crypto' | 'github',
  endpoint: string,
  options?: NitroFetchOptions<any>
) => {
  const config = useRuntimeConfig();

  const baseUrl = config.public[`${apiName}ApiBase` as keyof typeof config.public] as string;

  try {
    const data = await $fetch<T>(endpoint, {
      baseURL: baseUrl,
      ...options,

      onRequest({ request, options }) {
        // TODO: add authentication headers & more if needed
      },

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
