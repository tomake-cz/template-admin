/* eslint-disable no-console */
import { cp, rmSync, readFile, readFileSync, writeFile } from 'fs';

const ADMIN = './node_modules/@patrik_hajek/admin/';

const ROUTERS = ['singleRouter', 'multiRouter', 'globalRouter'];
const INDEX_ROUTER_PATH = './src/server/trpc/routers/index.ts';

const FILES: string[] = [];

type Client = {
  copyFiles: string[];
};
let client: Client;
try {
  client = JSON.parse(readFileSync('./src/assets/client.json', 'utf-8'));
} catch (e) {
  throw new Error("Can't parse client.json file");
}

if (client.copyFiles == null) {
  throw new Error('No copyFiles in client.json');
}
if (!Array.isArray(client.copyFiles)) {
  throw new TypeError('copyFiles is not an array');
}

FILES.push(...client.copyFiles);

FILES.sort((a, b) => a.localeCompare(b));
const admin = FILES.filter(
  (file) => !file.startsWith('!') && !file.startsWith('//'),
);
const local = FILES.filter(
  (file) => file.startsWith('!') && !file.startsWith('//'),
);

type MyFile = {
  path: string;
  bytes: Buffer;
};
const keptFiles: MyFile[] = [];

let promises = local.map((file) => {
  return new Promise((resolve, reject) => {
    readFile(file.slice(1), (err, data) => {
      if (!err) {
        keptFiles.push({ path: file.slice(1), bytes: data });
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
