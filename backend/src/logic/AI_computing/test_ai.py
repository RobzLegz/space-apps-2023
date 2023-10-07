import openai
# Set your OpenAI API key
openai.api_key = "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"

# Construct the custom model name
model_name = "ft:gpt-3.5-turbo-0613:personal::873jzHv3"

# Make an API request using the custom model
response = openai.ChatCompletion.create(
    model=model_name,
    messages=[{"role": "system", "content": "You are an AI tool that gets string type input and checks if it has old data or issues based on given context that will be fed into you, your task is to find the issue within the given text and suggest a fix based on the given context sources in this format: *[Section number]\n*[Text with issue]\n[Issue]\n*[Suggested fix]\n*[Source]\n*[Priority]. In the [Section number] field of the output put the section number of the string that has the problem. In the [Text with issue] field of the output, you display the string with the problem that you found in the input string by using the given sources. In the [Suggested fix] field of the output, you display a possible fix to the issue based on the given sources. In the [Source] field of the output, you display the source of the context you used to find the solution to the problem from the given context files. In the [Priority] field of the output, you display the priority of the fix, if the fix is related to changes shown in the context file and are possibly dangerous, show high priority. If there is no danger to human life but the issue is in context files, put out medium priority. If the problem doesn't appear in the context files and isn't a threat to human life but the context of the wording is too broad, output a low priority. Show output only after getting all the required information based on the context."}, {"role": "user", "content": "Review the text: 'Potatoes are green' and provide recommendations based on the context: 'Potatoes are brown' use only the given text and context for comparison and arange them using the format."}]
)

# Access and print the generated text
print(response.choices[0].message)