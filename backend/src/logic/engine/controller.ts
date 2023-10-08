import { Request, Response } from "express";
import * as fs from "fs";
import pdf from "pdf-parse";
import multer from "multer";
import { compareAndRecommend } from "../AI_computing/ai_checkFile";
import generateEmbedding from "../../utils/generateEmbedding";
import searchVector from "../../utils/searchVector";

const GPT_MODEL = "ft:gpt-3.5-turbo-0613:personal::87BBpzgT";
const GPT_MODEL_D = "gpt-3.5-turbo-0613";

interface Issue {
  issue: string;
  fix: string;
  source: string;
  priority: string;
  problem: string;
}

const processParagraphs = async (
  paragraphs: string[],
  fileName: string | null
) => {
  const issues: Issue[] = [];

  for (let i = 0; i < paragraphs.length; i++) {
    if (i < 10 || i > 15) {
      continue;
    }

    const paragraph = paragraphs[i];
    // console.log(paragraph);

    const embed = await generateEmbedding(paragraph);
    const query = await searchVector(embed);
    let context = "";

    query.forEach((entry) => {
      context =
        context +
        (entry.metadata ? entry.metadata.text : "") +
        "Source: " +
        (entry.metadata ? entry.metadata.source : "");
    });

    if (context.length > 8000) {
      context = context.substring(0, 8000);
    }

    const recommendations: string = await compareAndRecommend(
      GPT_MODEL,
      paragraph,
      context
    );

    console.log(recommendations);

    if (recommendations === "") {
      continue;
    }

    // // Initialize an empty object
    // const issue: Issue = {
    //   issue: paragraph,
    //   fix: "",
    //   source: "",
    //   priority: "",
    //   problem: "",
    // };

    function transformStringToObject(
      inputString: string,
      paragraph: string
    ): Issue {
      const jsonObject: Issue = {
        issue: "",
        fix: "",
        source: "",
        priority: "",
        problem: "",
      };

      const regex = /(\w+)_P_([\s\S]*?)(?=(\w+)_P_|$)/g;
      let match;

      while ((match = regex.exec(inputString)) !== null) {
        const [, key, value] = match;
        if (key in jsonObject) {
          jsonObject[key as keyof Issue] = value.trim();
        }
      }

      return jsonObject;
    }

    const issue = transformStringToObject(recommendations, paragraph);

    issues.push(issue);
  }

  return {
    pdfFileName: fileName,
    issues,
  };
};

export const engineCtrl = {
  uploadPDF: async (_req: Request, res: Response) => {
    try {
      //   let buffer = fs.readFileSync()
      let fileName: string | null = null;
      const storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, "./");
        },
        filename: (req, file, cb) => {
          fileName = file.originalname;
          cb(null, `${Date.now()}-${file.originalname}`);
        },
      });

      const upload = multer({ storage }).single("file");

      upload(_req, res, async (err: any) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ err: "Radās kļūme" });
        }

        if (!_req.file) {
          return res.status(400).json({ err: "No file uploaded." });
        }

        const pdfFilePath = _req.file.path;
        const pdfData = fs.readFileSync(_req.file.path);
        const pdfText = await pdf(pdfData);

        fs.unlink(pdfFilePath, (unlinkErr) => {
          if (unlinkErr) {
            console.error("Error deleting file:", unlinkErr);
          } else {
            console.log("File deleted successfully.");
          }
        });

        const paragraphs = pdfText.text
          .split(/\r?\n\r?\n/)
          .filter((p) => p.replaceAll(" ", "").length);

        const prikol = await processParagraphs(paragraphs, fileName);

        return res.json({
          fileName: fileName,
          text: pdfText.text,
          issues: prikol.issues,
        });
      });
    } catch (err: any) {
      console.error(err.message);

      return res.status(500).json({ err: "Radās kļūme" });
    }
  },
};
