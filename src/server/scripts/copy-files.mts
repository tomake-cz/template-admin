import { readFileSync, writeFileSync, existsSync } from 'fs';

const adminClientPath =
  './node_modules/@patrik_hajek/admin/src/assets/client.json';
const clientPath = './src/assets/client.json';

if (!existsSync(adminClientPath)) {
  throw new Error("Can't find client.json file");
}

let adminClient: any;
try {
  adminClient = JSON.parse(readFileSync(adminClientPath, 'utf-8'));
} catch (e) {
  throw new Error("Can't parse client.json file");
}

if (!('copyFiles' in adminClient)) {
  throw new Error("Can't find copyFiles in client.json file");
}

if (!existsSync(clientPath)) {
  writeFileSync(clientPath, JSON.stringify(adminClient.copyFiles, null, 2));
} else {
  const client = JSON.parse(readFileSync(clientPath, 'utf-8'));
  client.copyFiles = adminClient.copyFiles;
  writeFileSync(clientPath, JSON.stringify(client, null, 2));
}
