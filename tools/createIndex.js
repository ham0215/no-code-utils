const fs = require('fs');

async function createIndex() {
  const files = fs.readdirSync('./dist')

  for (let i = 0; i < files.length; i++) {
    await fs.promises.appendFile(`./index.ts`, `export * from './dist/${files[i].replace(/\.ts$/g, '')}';\n` );
  }
};

createIndex();