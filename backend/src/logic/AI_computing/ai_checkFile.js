const GPT_MODEL = 'ft:gpt-3.5-turbo-0613:personal::873jzHv3'; // Replace with your fine-tuned model ID
const inputString1 = "Screws must be made out of aluminium."; // Replace with the first string you want to compare
const inputString2 = "Screws must be made out of titanium"; // Replace with the second string for comparison
const axios = require('axios');


// Function to ask the fine-tuned model for recommendations
async function compareAndRecommend(model, string1, string2) {
  try {
    const messages = [
      { role: 'system', content: 'Compare two strings and provide recommendations for how to improve the first string based on the information given in the second string.' },
      { role: 'user', content: string1 },
      { role: 'assistant', content: string2 },
    ];

    const response = await openaiChatCompletion(model, messages);

    const answer = combineAndOutput(model, string1, response.choices[0].message.content);

    return answer;
  } catch (error) {
    console.error('An error occurred during the API request:', error);
    throw error; // Rethrow the error for further handling or debugging.
  }
}

async function combineAndOutput(model, string1, recommendation){
  const messages = [
    { role: 'system', content: "You are an AI tool that gets string type input and checks if it has old data or issues based on given context that will be fed into you, your task is to find the issue within the given text and suggest a fix based on the given context sources in this format: *[Section number]\n*[Text with issue]\n[Issue]\n*[Suggested fix]\n*[Source]\n*[Priority]. In the [Section number] field of the output put the section number of the string that has the problem. In the [Text with issue] field of the output, you display the string with the problem that you found in the input string by using the given sources. In the [Suggested fix] field of the output, you display a possible fix to the issue based on the given sources. In the [Source] field of the output, you display the source of the context you used to find the solution to the problem from the given context files. In the [Priority] field of the output, you display the priority of the fix, if the fix is related to changes shown in the context file and are possibly dangerous, show high priority. If there is no danger to human life but the issue is in context files, put out medium priority. If the problem doesn't appear in the context files and isn't a threat to human life but the context of the wording is too broad, output a low priority. Show output only after getting all the required information based on the context." },
    { role: 'user', content: `output information written in the system using ${recommendation} as a recommendation. ${string1} as the string with an issue, fill out the rest yourself.` },
  ];

  const response = await openaiChatCompletion(model, messages);

  return response.choices[0].message.content;
}

// Function to send a message to the OpenAI Chat Completion API
async function openaiChatCompletion(model, messages) {
  const response = await axios.post('https://api.openai.com/v1/chat/completions', {
    model,
    messages,
    temperature: 0,
  }, {
    headers: {
      'Authorization': 'Bearer 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', // Replace with your actual API key
    },
  });

  return response.data;
}

// Example usage
// Example usage
async function main() {
  const recommendations = await compareAndRecommend(GPT_MODEL, inputString1, inputString2);
  console.log(recommendations);
}

main(); // Call the async function
