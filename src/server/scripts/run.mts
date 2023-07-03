/* eslint-disable no-console */
import { renameSync } from 'fs';
import { execSync } from 'child_process';

renameSync('./src/server/prisma/script.ts', './src/server/prisma/script.mts');
const res = execSync('ts-node-esm ./src/server/prisma/script.mts');
renameSync('./src/server/prisma/script.mts', './src/server/prisma/script.ts');
console.log(res.toString());
