export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const instance = $fetch.create({
    baseURL: config.public.apiBase,
    credentials: 'include'
  });
  return {
    provide: { api: instance }
  }
});