import axios from "axios";

const GPT_MODEL = "ft:gpt-3.5-turbo-0613:personal::873jzHv3"; // Replace with your fine-tuned model ID
const inputString1 = "Screws must be made out of aluminium."; // Replace with the first string you want to compare
const inputString2 = "Screws must be made out of titanium"; // Replace with the second string for comparison

// Function to ask the fine-tuned model for recommendations
export async function compareAndRecommend(
  model: string,
  string1: string,
  string2: string
) {
  try {
    const messages = [
      { role: 'system', content: 'Compare two texts and provide recommendations for how to improve the first text based on the information given in the second text.' },
      { role: 'user', content: string1 },
      { role: 'assistant', content: string2 },
    ];

    const response = await openaiChatCompletion(model, messages);

    const answer = combineAndOutput(
      model,
      string1,
      response.choices[0].message.content
    );

    return answer;
  } catch (error) {
    console.error("An error occurred during the API request:", error);
    throw error; // Rethrow the error for further handling or debugging.
  }
}

async function combineAndOutput(
  model: string,
  string1: string,
  recommendation: string
) {
  const messages = [
    { role: 'system', content: "You are an AI tool that gets string type input and checks if it has old data or issues based on given context that will be fed into you, your task is to find the issue within the given text and suggest a fix based on the given context sources in this format: issue_P_ [ISSUE]; fix_P_ [FIX]; source_P_ [SRC]; priority_P_ [PR]; problem - [PRB]..  In the [ISSUE] field of the output, you display the string with the problem that you found in the input string by using the given sources. In the [FIX] field of the output, you display a possible fix to the issue based on the given sources. In the [SRC] field of the output, you display the source of the context you used to find the solution to the problem from the given context files. In the [PR] field of the output, you display the priority of the fix, if the fix is related to changes shown in the context file and are possibly dangerous to humans or could be of high importance show high priority, If there is no danger to human life but the issue is in context files, put out  priority_P_ MEDIUM priority, If the problem doesn't appear in the context files and isn't a threat to human life but the context of the wording is too broad, output a low priority. Show output only after getting all the required information based on the context. In the [ISSUE] field of the output, you output the problem that's defined using the information about the issue and the fix." },
    { role: 'user', content: `Output information using ${recommendation} as a recommendation, ${string1} as the issue. Fill out the rest yourself basing your opinion on the two given inputs.` },
  ];

  const response = await openaiChatCompletion(model, messages);

  return response.choices[0].message.content;
}

interface message {
  role: string;
  content: string;
}

// Function to send a message to the OpenAI Chat Completion API
async function openaiChatCompletion(model: string, messages: message[]) {
  try {
  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model,
      messages,
      temperature: 0,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Replace with your actual API key
      },
    }
  );

  return response.data;
  } catch (err) {
    return "";
  }
}

// Example usage
// Example usage
// async function main() {
//   const recommendations = await compareAndRecommend(
//     GPT_MODEL,
//     inputString1,
//     inputString2
//   );
//   console.log(recommendations);
// }

// main(); // Call the async function
