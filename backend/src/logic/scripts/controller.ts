import { Request, Response } from "express";
import prisma from "../../lib/prisma";
import data from "../../data/data.json";

export const scriptCtrl = {
  writeLL: async (_req: Request, res: Response) => {
    try {
      console.log(data);

      const d: any = data;

      for (const ll of d) {
        const newLL = await prisma.lL.create({ data: ll });

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
