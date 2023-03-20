import {Router} from "express";
import { createClient } from "../controllers/clients.controller.js";
import { schemaValidateClient } from "../middlewares/validateClient.js";

const clientRouter = Router();

clientRouter.post("/clients", schemaValidateClient, createClient);

export default clientRouter;