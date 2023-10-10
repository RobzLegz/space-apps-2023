import pinecone
import numpy as np
from nomic import atlas
import nomic
from dotenv import load_dotenv
import os

load_dotenv()

pinecone.init(api_key=os.environ["PINECONE_API_KEY"], environment='gcp-starter')
nomic.login(os.environ["ATLAS_API_KEY"])

print(os.environ["PINECONE_API_KEY"])
print(os.environ["ATLAS_API_KEY"])

index = pinecone.Index("exacto")

num_embeddings = 2000

vectors = index.query([0 for x in range(1536)], top_k=2000, include_values=True, include_metadata=True)
# print(vectors)
ids = []
embeddings = []
data=[]
texts=[]
for x in vectors['matches']:
    data.append({"id": x["id"], "text": x["metadata"]["text"]})
    embeddings.append(x["values"])


# print(data[2])
# print(ids)
# print(embeddings)

embeddings = np.array(embeddings)

atlas.map_embeddings(embeddings=embeddings, data=data, id_field='id')