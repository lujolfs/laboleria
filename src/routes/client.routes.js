import {Router} from "express";
import { createClient, findClientOrders } from "../controllers/clients.controller.js";
import { schemaValidateClient } from "../middlewares/validateClient.js";

const clientRouter = Router();

clientRouter.post("/clients", schemaValidateClient, createClient);
clientRouter.get("/clients/:id/orders", findClientOrders)

export default clientRouter;