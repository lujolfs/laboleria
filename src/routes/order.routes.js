import {Router} from "express";
import { createOrder, getOrders, getOrdersId, patchDelivery } from "../controllers/orders.controller.js";
import { checkOrderDelivered, checkOrderExists, schemaValidateOrders } from "../middlewares/validateOrders.js";

const orderRouter = Router();

orderRouter.post("/order", schemaValidateOrders, createOrder);
orderRouter.get("/orders", getOrders);
orderRouter.get("/orders/:id", getOrdersId);
orderRouter.patch("/order/:id", checkOrderExists, checkOrderDelivered, patchDelivery);

export default orderRouter;