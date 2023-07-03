const { copyFile } = require('fs');

console.log('Installing admin...');

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
  'src/server/middleware',
  'src/server/prisma',
  'src/server/scripts',
  'src/server/trpc/routers/index.ts',
  'src/server/trpc/routers/assets.ts',
  'src/server/trpc/context.ts',
  'src/server/trpc/trpc.ts',
  'src/server/utils',
  'src/stores',
  'src/types',
  'src/utils',
  'src/app.vue',
  'src/env.ts',
  '.eslintrc.json',
  '.gitignore',
  '.lintstagedrc.json',
  '.npmrc',
  '.prettierrc.json',
  '.prettierrc.json',
  'nuxt.config.ts',
  'package.json?',
  'tailwind.config.js',
  'tsconfig.json',
];

FILES.forEach((file) => {
  copyFile(ADMIN + file, file, (err) => {
    if (err) throw err;
    console.log(`${file} was successfully copied`);
  });
});
