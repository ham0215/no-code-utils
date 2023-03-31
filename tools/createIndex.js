const fs = require('fs');

async function createIndex() {
  const files = fs.readdirSync('./libs')

  for (let i = 0; i < files.length; i++) {
    if (files[i] === '.keep') continue;

    await fs.promises.appendFile(`./index.ts`, `export * from './libs/${files[i].replace(/\.ts$/g, '')}';\n` );
  }
};

createIndex();
