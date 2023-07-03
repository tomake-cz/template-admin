import { router } from '../trpc';

import { singleRouter } from './single';
import { multiRouter } from './multi';
import { viewRouter } from './view';
import { assetRouter } from './asset';
// import { globalRouter } from './global';

export const appRouter = router({
  single: singleRouter,
  multi: multiRouter,
  view: viewRouter,
  asset: assetRouter,
  // global: globalRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
