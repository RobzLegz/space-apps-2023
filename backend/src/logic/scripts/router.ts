import express from "express";
import { scriptCtrl } from "./controller";

export const scriptRouter = express.Router();

scriptRouter.route("/write").post(scriptCtrl.writeLL);
scriptRouter.route("/dd").post(scriptCtrl.deleteDuplicates);
scriptRouter.route("/write_std").post(scriptCtrl.writeSTD);
scriptRouter.route("/generateLLEmbeddings").get(scriptCtrl.generateLLEmbeddings);
scriptRouter.route("/searchVector").get(scriptCtrl.searchVector);
scriptRouter.route("/transferDb").get(scriptCtrl.transferDb);
scriptRouter.route("/addSource").get(scriptCtrl.addSource);