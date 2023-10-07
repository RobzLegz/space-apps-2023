const GPT_MODEL = 'gpt-3.5-turbo';
const contextStrings = "Context data"; // Replace with your actual context data
const userInput = "input"; // Replace with your actual user input (now representing the query)
const axios = require('axios');

// Function to ask a query using GPT with context and user input
async function ask(model, printMessage = false) {
  const messages = [
    { role: 'system', content: contextStrings },
    { role: 'user', content: userInput },
  ];

  const response = await openaiChatCompletion(model, messages);

  if (printMessage) {
    console.log('User Input (Query):', userInput);
    console.log('Context:', contextStrings);
    console.log('Response:', response.choices[0].message.content);
  }

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
const response = await ask(GPT_MODEL, true);