/* eslint-disable no-console */
import { cp, rmSync, readFile, writeFile } from 'fs';

const ADMIN = './node_modules/@patrik_hajek/admin/';

const ROUTERS = ['singleRouter', 'multiRouter', 'globalRouter'];
const INDEX_ROUTER_PATH = './src/server/trpc/routers/index.ts';

const FILES = [
  '.husky/pre-commit',
  'src/assets',
  '!src/assets/client.json',
  'src/components',
  'src/composables',
  'src/layouts',
  // 'src/middlewares',
  'src/pages/assets',
  'src/pages/index.vue',
  'src/pages/webove-zaznamy/index.vue',
  'src/plugins',
  'src/public',
  'src/server/api',
  'src/server/middleware',
  'src/server/prisma',
  'src/server/scripts',
  '!src/server/scripts/copy.mts',
  'src/server/trpc/routers/index.ts',
  'src/server/trpc/routers/asset.ts',
  'src/server/trpc/routers/view.ts',
  'src/server/trpc/context.ts',
  'src/server/trpc/trpc.ts',
  'src/server/utils',
  'src/stores',
  'src/types',
  '!src/types/server.d.ts',
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

FILES.sort((a, b) => a.localeCompare(b));
const admin = FILES.filter((file) => !file.startsWith('!'));
const local = FILES.filter((file) => file.startsWith('!'));

type MyFile = {
  path: string;
  bytes: Buffer;
};
const keptFiles: MyFile[] = [];

let promises = local.map((file) => {
  return new Promise((resolve, reject) => {
    readFile(file.slice(1), (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      keptFiles.push({ path: file.slice(1), bytes: data });
      resolve(null);
    });
  });
});
await Promise.all(promises);

promises = admin.map((file) => {
  return new Promise((resolve, reject) => {
    try {
      rmSync(file, { recursive: true, force: true });
    } catch (err) {
      console.error(err);
    }

    cp(ADMIN + file, file, { recursive: true }, (err) => {
      if (!err) {
        resolve(null);
        return;
      }

      if (err.code === 'ENOENT') {
        console.log(`${file} does not exist`);
        resolve(null);
        return;
      }

      reject(err);
    });
  });
});
await Promise.all(promises);

promises = keptFiles.map((file) => {
  return new Promise((resolve, reject) => {
    writeFile(file.path, file.bytes, (err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(null);
    });
  });
});
await Promise.all(promises);

readFile(INDEX_ROUTER_PATH, 'utf8', (err, data) => {
  if (err) {
    throw err;
  }

  const result = data.split('\n').filter((line) => {
    return !new RegExp(ROUTERS.join('|')).test(line);
  });

  writeFile(INDEX_ROUTER_PATH, result.join('\n'), 'utf8', (err) => {
    if (err) {
      throw err;
    }
  });
});
