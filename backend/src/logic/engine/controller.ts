import { Request, Response } from "express";
import * as fs from "fs";
import pdf from "pdf-parse";
import multer from "multer";

export const engineCtrl = {
  uploadPDF: async (_req: Request, res: Response) => {
    try {
      //   let buffer = fs.readFileSync()
      const storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, "./");
        },
        filename: (req, file, cb) => {
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

        return res.json({
          msg: "File uploaded successfully",
          paragraphs,
        });
      });
    } catch (err: any) {
      console.error(err.message);

      return res.status(500).json({ err: "Radās kļūme" });
    }
  },
};
