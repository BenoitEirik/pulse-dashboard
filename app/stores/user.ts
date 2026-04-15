export const useUserStore = defineStore('user', () => {
  const preferences = ref({
    theme: 'light' as 'system' | 'light' | 'dark',
    language: 'en' as 'en' | 'fr',
  });

  const account = ref({
    id: '',
    name: 'Unknown User',
    email: 'unknown@example.com',
  });

  return {
    preferences,
    account,
  };
});
