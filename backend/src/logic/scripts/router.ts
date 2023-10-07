import express from "express";
import { scriptCtrl } from "./controller";

export const scriptRouter = express.Router();

scriptRouter.route("/write").post(scriptCtrl.writeLL);
