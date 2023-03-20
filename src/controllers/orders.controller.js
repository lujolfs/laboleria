import { insertOrder } from "../repositories/ordersRepository.js";
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