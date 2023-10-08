import { Pinecone } from "@pinecone-database/pinecone";

const pinecone = new Pinecone({
  environment: "gcp-starter",
  apiKey: process.env.PINECONE_API_KEY ?? "",
});

const searchVector = async (embedding: number[]) => {
  try {
    const index = await pinecone.Index("exacto");

    const query = await index.query({
      vector: embedding,
      topK: 100,
      includeMetadata: true,
    });
    if (!query.matches) {
      throw new Error("empty db");
    }

    return query.matches;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export default searchVector;
