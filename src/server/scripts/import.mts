import { readdirSync, writeFile, readFile } from 'fs';

const DIR = './src/server/trpc/routers';

const imports = new Map<string, string[]>();
const utilFilePaths = readdirSync('./src/server/utils', {
  withFileTypes: true,
}).map((file) => {
  return `./src/server/utils/${file.name}`;
});

for (const path of utilFilePaths) {
  await new Promise((resolve, reject) => {
    readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        throw err;
      }

      const matches = data.match(/^export const (\w+) =/gm);
      if (!matches) {
        return;
      }

      const utilName = path.split('/').pop()?.split('.')[0];
      if (!utilName) {
        return;
      }

      const utilFunctions = matches.map((match) => {
        return match.split(' ')[2];
      });

      imports.set(utilName, utilFunctions);
      resolve(null);
    });
  });
}

const importStatements = [...imports].map(([key, value]) => {
  return `import { ${value.join(', ')} } from '../../utils/${key}';`;
});

const filePaths = readdirSync(DIR, { withFileTypes: true }).map((file) => {
  return `${DIR}/${file.name}`;
});

const IS_MODIFIED_BY_SCRIPT_TAG = '// modified by script' + '\n';
filePaths.forEach((path) => {
  readFile(path, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    let dataToWrite = '';
    if (data.startsWith(IS_MODIFIED_BY_SCRIPT_TAG)) {
      dataToWrite = data.split('\n').slice(3).join('\n');
    } else {
      dataToWrite =
        IS_MODIFIED_BY_SCRIPT_TAG + importStatements.join('') + '\n\n' + data;
    }

    writeFile(path, dataToWrite, (err) => {
      if (err) throw err;
    });
  });
});
