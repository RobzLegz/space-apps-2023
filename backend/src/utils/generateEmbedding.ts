import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

const generateEmbedding = async (text: string) => {
    const embedding = await openai.embeddings.create({
        input: text,
        model: "text-embedding-ada-002",
      });

    return embedding.data[0].embedding;
}

export default generateEmbedding;