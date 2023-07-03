import { readFileSync } from 'fs';

export default defineEventHandler(() => {
  const file = readFileSync('../src/types/server.d.ts');
  return {
    types: file.toString(),
  };
});
