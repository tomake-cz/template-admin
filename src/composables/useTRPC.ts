import { createTRPCNuxtClient } from 'trpc-nuxt/client';
import type { AppRouter } from '~/server/trpc/routers';

export const useTRPC = () => {
  const { $trpc } = useNuxtApp();
  return $trpc as ReturnType<typeof createTRPCNuxtClient<AppRouter>>;
};

export const useCachedTRPC = <T>(
  cb: (t: ReturnType<typeof useTRPC>) => T,
  skip?: boolean,
) => {
  const def = { data: ref(null), pending: ref(false) };
  if (skip) return def;

  return useInputStore().hasCachedInputs() ? def : cb(useTRPC());
};
