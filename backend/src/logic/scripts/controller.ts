import { Request, Response } from "express";
import prisma from "../../lib/prisma";
import data from "../../data/data.json";

export const scriptCtrl = {
  writeLL: async (_req: Request, res: Response) => {
    try {
      prisma.lL.deleteMany();
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
};
