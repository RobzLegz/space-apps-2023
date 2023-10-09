# Exacto | S.T.A.R. Terminal

![image](https://github.com/RobzLegz/space-apps-2023/assets/62758448/ab130cc0-f36d-45e7-ac2f-4e65a845e622)

## High-Level Summary

We developed an innovative AI tool to help NASA scientists manage their technical documents. Using webscraping technologies we collect the current available NASA resources like new research, lessons learned and others, then automatically catalogue them into a database. Users can submit a document on our website, it automatically scans the contents, finds relevant information on the topic in our database, then uses a custom machine learning model to suggest improvements like fixing ambiguities, updating outdated info and incorporating new research. This tool would speed up the manual work that goes into keeping these documents up to date and speed up the review process.

## Project Demo

https://failiem.lv/u/7pea35374b

## Project Details

For our backend we used NodeJS (Express) and Python. For our frontend we used Next.js. For our database we used Pinecone and MongoDB.

We used Python library Selenium to webscrape NASA lessons learned. Then we generated embeddings for every piece of information contained in the lessons learned using OpenAI Embeddings API. We stored these embeddings in a Pinecone vector database and in MongoDB document database for backup.

When a user uploads a PDF document on our website, we send it to our NodeJS backend where it gets divided into parts for which we find improvements. We generate an embedding for each of these parts, then do a vector search in our Pinecone database to find relevant information, which we then provide directly into the context of a finetuned OpenAI Chat Completions API, which finds and suggests improvements to every part of the PDF text.

This embedding and vector database approach minimizes GPT hallucinations and provides more precise info, because all of the relevant information and sources fit into GPT’s context window, unlike traditional finetuned models, which even with finetuning are prone to forgetting or providing nonexistant info with incorrect sources.

## Use of Artificial Intelligence

We used ChatGPT to help write simple parts of our code. We used PerplexityAI to help conduct research into what tools we could use for the job.

## Space Agency Data

| Link URL | Link Text |
| --- | --- |
| https://standards.nasa.gov/all-standards | NASA standards |
| https://llis.nasa.gov/ | NASA Lessons Learned |

## References

| Link URL | Link Text |
| --- | --- |
| https://platform.openai.com/docs/api-reference | OpenAI API |
| https://andriymulyar.com/blog/how-to-visualize-pinecone-vector-database | Visualizing Pinecone vector databse |
