import { Request, Response } from "express";
import * as fs from "fs";
import * as pdf from "pdf-parse";
import multer from "multer";
import path from "path";

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

      const upload = multer({storage}).single('file');
      
      upload(_req, res, (err: any) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ err: "Radās kļūme" })
        }

        if (!_req.file) {
            return res.status(400).json({ err: "No file uploaded." })
        }

        return res.json({
            msg: "File uploaded successfully",
        });
      });
    } catch (err: any) {
      console.error(err.message);

      return res.status(500).json({ err: "Radās kļūme" });
    }
  },
};
