import { insertOrder, buildOrder, buildOrderQuery, buildOrderId, updateDelivery } from "../repositories/ordersRepository.js";
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
    let filter = req.query;
    if (filter.date) {
        try {
            const orderObj = await buildOrderQuery(filter.date);
            if (orderObj.rowCount === 0) {
                res.sendStatus(404);
            } else {
            res.status(200).send(orderObj.rows);
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    } else {
        try {
            const orderObj = await buildOrder();
            res.status(200).send(orderObj.rows);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}

export async function getOrdersId (req, res) {
    let {id} = req.params;
    try {
        const orderObj = await buildOrderId(id);
        if (orderObj.rowCount === 0) {
            res.sendStatus(404);
        } else {
        res.status(200).send(orderObj.rows);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function patchDelivery (req, res) {
    try {
        const updateOrder = await updateDelivery(req.userObject);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).send(error.message);
    }
}