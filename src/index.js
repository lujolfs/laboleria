import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cakeRouter from "./routes/cake.routes.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cakeRouter);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server running in port: ${port}`));