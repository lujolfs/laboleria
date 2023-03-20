import {Router} from "express";
import { createOrder, getOrders, getOrdersId } from "../controllers/orders.controller.js";
import { schemaValidateOrders } from "../middlewares/validateOrders.js";

const orderRouter = Router();

orderRouter.post("/order", schemaValidateOrders, createOrder);
orderRouter.get("/orders", getOrders);
orderRouter.get("/orders/:id", getOrdersId);

export default orderRouter;