/* eslint-disable no-console */
import { cp } from 'fs';

const ADMIN = './node_modules/@patrik_hajek/admin/';

const FILES = [
  '.husky',
  'src/assets',
  'src/components',
  'src/composables',
  'src/layouts',
  'src/middlewares',
  'src/plugins',
  'src/public',
  'src/server/api',
  // 'src/server/middleware',
  'src/server/prisma',
  'src/server/scripts',
  'src/server/trpc/routers/index.ts',
  'src/server/trpc/routers/asset.ts',
  'src/server/trpc/context.ts',
  'src/server/trpc/trpc.ts',
  'src/server/utils',
  'src/stores',
  'src/types',
  'src/utils',
  'src/app.vue',
  'src/env.ts',
  '.eslintrc.json',
  '.lintstagedrc.json',
  'nuxt.config.ts',
  // 'package.json',
  'tailwind.config.js',
  'tsconfig.json',
];

FILES.forEach((file) => {
  cp(ADMIN + file, file, { recursive: true }, (err) => {
    if (!err) {
      return;
    }

    if (err.code === 'ENOENT') {
      console.log(`${file} does not exist`);
      return;
    }

    console.error(err);
  });
});
