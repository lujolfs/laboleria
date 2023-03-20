import {Router} from "express";
import { createOrder, getOrders } from "../controllers/orders.controller.js";
import { schemaValidateOrders } from "../middlewares/validateOrders.js";

const orderRouter = Router();

orderRouter.post("/order", schemaValidateOrders, createOrder);
orderRouter.get("/order", getOrders);

export default orderRouter;