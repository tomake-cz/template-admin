import { router } from '../trpc';

import { viewRouter } from './view';
import { assetRouter } from './asset';

export const appRouter = router({
  view: viewRouter,
  asset: assetRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
