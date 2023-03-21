import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cakeRouter from "./routes/cake.routes.js";
import clientRouter from "./routes/client.routes.js";
import orderRouter from "./routes/order.routes.js";
import flavourRouter from "./routes/flavour.routes.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cakeRouter);
app.use(clientRouter);
app.use(orderRouter);
app.use(flavourRouter);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server running in port: ${port}`));