import { Request, Response } from "express";
import prisma from "../../lib/prisma";
import data from "../../data/data.json";
import stdData from "../../data/new_std.json";

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
};
