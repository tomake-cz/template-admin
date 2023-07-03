import { readFileSync, writeFileSync } from 'fs';

const SERVER_FILE_PATH = './src/types/server.d.ts';

const serverFile = readFileSync(SERVER_FILE_PATH, 'utf-8');
const prismaFile = readFileSync(
  './node_modules/.prisma/client/index.d.ts',
  'utf-8',
);
const schemaFile = readFileSync('./prisma/schema.prisma', 'utf-8');

const models = schemaFile
  .split('\n')
  .filter((line) => /^model \w+/gm.test(line))
  .map((x) => x.replace('model ', '').replace(' {\r', ''));

let isReadingType = false;
let type = '';
const readTypes = new Map<string, string>();
prismaFile.split('\n').forEach((line) => {
  if (!isReadingType) {
    if (!line.includes('export type ')) return;
    if (line.search(new RegExp('( ' + models.join(' )|( ') + ' )')) === -1)
      return;
    isReadingType = true;
  }

  type += line;

  if (line.match(/\w$/)) {
    type += ';';
  }

  if (line.includes('}')) {
    isReadingType = false;
    type = type.replace('export type ', '');
    const [name, ...rest] = type.split('=');
    readTypes.set(name.trim(), rest.join('').trim());
    type = '';
  }
});

const ends = [
  {
    regex: ';',
    code: ';',
  },
  {
    regex: '\\[\\]',
    code: '[]',
  },
  {
    regex: '>',
    code: '>',
  },
];

let newServerFile = serverFile;
readTypes.forEach((t, key) => {
  let regexp = new RegExp(`import\\("\\.prisma\\/client"\\)\\.${key} `, 'g');
  newServerFile = newServerFile.replaceAll(regexp, t);

  ends.forEach(({ regex, code }) => {
    regexp = new RegExp(
      `import\\("\\.prisma\\/client"\\)\\.${key}${regex}`,
      'g',
    );
    newServerFile = newServerFile.replaceAll(regexp, t + code);
  });
});

writeFileSync(SERVER_FILE_PATH, newServerFile, { encoding: 'utf-8' });
