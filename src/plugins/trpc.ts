import { createTRPCNuxtClient, httpBatchLink } from 'trpc-nuxt/client';
import type { AppRouter } from 'trpc/routers/index';

export default defineNuxtPlugin((ctx) => {
  const client = createTRPCNuxtClient<AppRouter>({
    links: [
      httpBatchLink({
        url: useRuntimeConfig().public.API_TRPC,
        fetch(url, options) {
          return fetch(url, {
            ...options,
            credentials: 'include',
            mode: 'cors',
          });
        },
        headers() {
          if (ctx?.req) {
            // To use SSR properly, you need to forward the client's headers to the server
            // This is so that you can pass through things like cookies when we're server-side
            // rendering
            // If you're using Node 18, omit the "connection" header
            const {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              ...headers
            } = (ctx.req as any).headers;
            return {
              ...headers,
              // Optional: inform server that it's an SSR request
              'x-ssr': '1',
            };
          }
          return {};
        },
      }),
    ],
  });

  return {
    provide: {
      client,
    },
  };
});
