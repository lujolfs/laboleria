import {Router} from "express";
import { createOrder } from "../controllers/orders.controller.js";
import { schemaValidateOrders } from "../middlewares/validateOrders.js";

const orderRouter = Router();

orderRouter.post("/order", schemaValidateOrders, createOrder);

export default orderRouter;