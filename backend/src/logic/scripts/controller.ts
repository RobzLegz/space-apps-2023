import { Request, Response } from "express";
import prisma from "../../lib/prisma";
import data from "../../data/data.json";
import stdData from "../../data/new_std.json";

import OpenAI from "openai";
import { encodeGenerator, encode } from "gpt-tokenizer";
import { LL } from "@prisma/client";
import { Pinecone } from "@pinecone-database/pinecone";

const key = process.env.OPENAI_API_KEY;
console.log(key);
const openai = new OpenAI({
  apiKey: key,
});

const pinecone = new Pinecone({
  environment: "gcp-starter",
  apiKey: "3c1d8a55-d6d3-4706-b654-bc28f70948ba",
});

export const scriptCtrl = {
  writeLL: async (_req: Request, res: Response) => {
    try {
      let writtenUrls: string[] = [];

      const d: any = data;

      for (const ll of d) {
        if (writtenUrls.includes(ll.url)) {
          continue;
        }

        const newLL = await prisma.lL.create({ data: ll });

        writtenUrls = [...writtenUrls, ll.url];

        console.log(newLL);
        console.log("");
      }

      res.json({
        msg: "Data saved",
      });
    } catch (err: any) {
      console.error(err.message);

      return res.status(500).json({ err: "Radās kļūme" });
    }
  },
  deleteDuplicates: async (_req: Request, res: Response) => {
    try {
      let lls = await prisma.lL.findMany();

      for (let i = 0; i < lls.length; i++) {
        const item = lls[i];

        for (let j = 0; j < lls.length; j++) {
          const jtem = lls[j];

          if (i !== j && item.url === jtem.url) {
            await prisma.lL.delete({ where: { id: jtem.id } });

            lls = lls.filter((it) => it.id !== jtem.id);

            console.log("deleted", jtem.id, jtem.url);
          }
        }
      }
      
      res.json({
        msg: "Data saved",
      });
    } catch (err: any) {
      console.error(err.message);

      return res.status(500).json({ err: "Radās kļūme" });
    }
  },
  writeSTD: async (_req: Request, res: Response) => {
    try {
      const d: { txt: string; title: string }[] = stdData as any;

      for (const std of d) {
        for (const txt of std.txt.split(".               ")) {
          const newSTD = await prisma.sTD.create({
            data: {
              title: std.title,
              txt: txt,
            },
          });

          console.log(newSTD);
          console.log("");
        }
      }

      res.json({
        msg: "Data saved",
      });
    } catch (err: any) {
      console.error(err.message);

      return res.status(500).json({ err: "Radās kļūme" });
    }
  },
  generateLLEmbeddings: async (_req: Request, res: Response) => {
    try {
      const query = (await prisma.lL.findMany()).filter(
        (item) => !item.embeddings.length
      );

      console.log(query.length);
      // console.log(query[10].embeddings)
      const batchSize = 20; // Set your desired batch size
      const batches = [];

      // Split the `query` array into batches
      for (let i = 0; i < query.length; i += batchSize) {
        const batch = query.slice(i, i + batchSize);
        batches.push(batch);
      }

      // Define a function to process a batch of items
      const processBatch = async (batch: LL[]) => {
        const embeddingTexts = batch.map((prikol) => {
          const text =
            prikol.subject ??
            "" +
              prikol.driving_event +
              prikol.lessons_learned +
              prikol.recomendations;

          return text;
        });

        const embedding = await openai.embeddings.create({
          input: embeddingTexts,
          model: "text-embedding-ada-002",
        });

        batch.forEach(async (prikol, i) => {
          await prisma.lL.update({
            where: { id: prikol.id },
            data: { embeddings: embedding.data[i].embedding },
          });
        });
      };

      for (let i = 0; i < batches.length; i++) {
        const batch = batches[i];
        await processBatch(batch);
        console.log(`Batch ${i + 1}/${batches.length} processed`);
      }

      res.json({
        msg: "Data saved",
      });
    } catch (err: any) {
      console.error(err.message);

      return res.status(500).json({ err: "Radās kļūme" });
    }
  },
  searchVector: async (req: Request, res: Response) => {
    try {
      const { embedding } = req.body;

      const index = await pinecone.Index("exacto");

      const query = await index.query({
        vector: embedding,
        topK: 100,
        includeMetadata: true,
      });
      if (!query.matches) {
        return res.status(500).json({ err: "erorrr" });
      }

      console.log(query.matches[10]);

      res.json({
        matches: query.matches,
      });
    } catch (err: any) {
      console.error(err.message);

      return res.status(500).json({ err: "Radās kļūme" });
    }
  },
  transferDb: async (_req: Request, res: Response) => {
    try {
      const mongodb = (await prisma.lL.findMany()).filter(
        (item) => item.embeddings.length
      );

      console.log(mongodb.length);

      const index = pinecone.Index("exacto");

      const BATCH_SIZE = 300;

      const upsertInBatches = async (data: any) => {
        for (let i = 0; i < data.length; i += BATCH_SIZE) {
          const batch = data.slice(i, i + BATCH_SIZE);
          await index.upsert(batch);
          console.log(`Batch ${i / BATCH_SIZE + 1} upserted`);
        }
      };

      const newformat = mongodb.map((x) => {
        return {
          id: x.id,
          values: x.embeddings,
          metadata: {
            text:
              x.subject ??
              "" + x.driving_event + x.lessons_learned + x.recomendations,
          },
        };
      });

      await upsertInBatches(newformat);

      res.json({ msg: "success" });
    } catch (err: any) {
      console.error(err.message);

      return res.status(500).json({ err: "Radās kļūme" });
    }
  },
  addSource: async (_req: Request, res: Response) => {
    try {
      const mongodb = (await prisma.lL.findMany()).filter(
        (item) => item.embeddings.length
      );

      console.log(mongodb.length);

      const index = pinecone.Index("exacto");

      const BATCH_SIZE = 100;

      const upsertInBatches = async (data: any) => {
        for (let i = 0; i < data.length; i += BATCH_SIZE) {
          const batch = data.slice(i, i + BATCH_SIZE);
          await index.upsert(batch);
          console.log(`Batch ${i / BATCH_SIZE + 1} upserted`);
        }
      };

      const newformat = mongodb.map((x) => {

        var text = (x.subject ??
          "") + x.driving_event + x.lessons_learned + x.recomendations

        const maxLength = 40000

        if (Buffer.byteLength(text, 'utf8') > maxLength) {
          const encodedText = Buffer.from(text, 'utf8');
          const truncatedBuffer = Buffer.alloc(maxLength);
          encodedText.copy(truncatedBuffer, 0, 0, maxLength);
          text = truncatedBuffer.toString('utf8');
        }

        return {
          id: x.id,
          values: x.embeddings,
          metadata: {
            text: text,
            source: `Lessons learned ID ${x.url}, title: ${x.subject}`,
          },
        };
      });

      await upsertInBatches(newformat);

      res.json({ msg: "success" });
    } catch (err: any) {
      console.error(err.message);

      return res.status(500).json({ err: "Radās kļūme" });
    }
  },
};
