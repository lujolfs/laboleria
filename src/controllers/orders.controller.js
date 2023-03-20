import { insertOrder, buildOrder } from "../repositories/ordersRepository.js";
import dayjs from "dayjs";

export async function createOrder (req, res) {
    let order = {...req.userObject, "createdAt": dayjs().format('YYYY-MM-DD HH:mm')};
    try {
        await insertOrder(order);
        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function getOrders (req, res) {
    try {
        const orderObj = await buildOrder();
        res.status(200).send(orderObj.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
}