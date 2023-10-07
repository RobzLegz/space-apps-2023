import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import { scriptRouter } from "./src/logic/scripts/router";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/scripts", scriptRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
