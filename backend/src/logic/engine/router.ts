import express from "express";
import { engineCtrl } from "./controller";

export const engineRouter = express.Router();

engineRouter.route("/upload_pdf").post(engineCtrl.uploadPDF);
