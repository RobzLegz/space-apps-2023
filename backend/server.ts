import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import 'dotenv/config'
import { scriptRouter } from "./src/logic/scripts/router";

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/scripts", scriptRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
