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
                cb(null, "./uploads/");
            },
            filename: (req, file, cb) => {
                cb(null, `${Date.now()}-${file.originalname}`);
            },
      });

      const upload = multer({storage});
      


      res.json({
        msg: "Data saved",
      });
    } catch (err: any) {
      console.error(err.message);

      return res.status(500).json({ err: "Radās kļūme" });
    }
  },
};
