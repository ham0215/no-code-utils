const fs = require('fs');
const path = require('path');

async function requestOpenAI(funcName, design) {
  const { Configuration, OpenAIApi } = require("openai");

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const content = `
    次の要件を満たすTypescriptの関数を返却してください。
    コードの説明や前置きは不要です。コードだけ返却してください。
    関数にはexportをつけてください。
    関数名は${funcName}。
    ${design}
  `;

  const options = {
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'user', content }
    ]
  };

  const completion = await openai.createChatCompletion(options);

  if (completion.status === 200) {
    saveFile(funcName, completion.data.choices[0].message.content);
  } else {
    console.log(completion.response.data.error.message);
  }

  // rate limit (20/minute)
  await sleep(3000);
}

async function getFiles() {
  const files = fs.readdirSync('./docs');

  for (let i = 0; i < files.length; i++) {
    await readFile(files[i]);
  }
}

async function readFile(fileName) {
  console.info(fileName);
  const data = fs.readFileSync(path.join('./docs', fileName), 'utf-8');
  await requestOpenAI(fileName.replace(/\.txt$/g, ''), data);
}

async function saveFile(fileName, data) {
  console.info(data);
  await fs.promises.writeFile(`./dist/${fileName}.ts`, data);
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

getFiles();
