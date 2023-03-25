const { Configuration, OpenAIApi } = require("openai");
const fs = require('fs');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function requestOpenAI(openai) {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {"role": "user", "content": "次の要件を満たすTypescriptの関数を返却してください。コードだけ返却してください。・関数名はparseDate・文字列をDate型に変換する・変換に失敗した場合はundefinedを返却する"}
    ]
  });

  console.log(completion.data.choices[0].message.content);
};

// requestOpenAI(openai);

const res = "```typescript\nfunction parseDate(dateString: string): Date | undefined {\n  const date = new Date(dateString);\n  return isNaN(date.getTime()) ? undefined : date;\n}\n```";
let result = res;
const patterns = [/```typescript/g, /```/g];
patterns.forEach(pattern => {
  result = result.replace(pattern, '');
});

console.log(result);
