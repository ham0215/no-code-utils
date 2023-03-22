const { Configuration, OpenAIApi } = require("openai");

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

requestOpenAI(openai);
