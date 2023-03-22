import { orderSchema } from "../modules/orders.module.js"
import { checkCake, checkClient, checkDelivered, checkOrder } from "../repositories/ordersRepository.js";

export async function schemaValidateOrders (req, res, next) {
    let input = req.body;

    const {error} = orderSchema.validate(input, {abortEarly: false});

    if (error) {
        const errors = error.details.map((msg) => msg.path[0]);
        if (errors == ("quantity" || "price")) {
            return res.sendStatus(400);
        } else {
            return (res.sendStatus(422));
        }
    }

    try {
        const {rows} = await checkCake(input);
        if (rows[0].count !== "0") {
            const {rows} = await checkClient(input);
            if (rows[0].count === "0") {
                return res.sendStatus(404);
            }
        } else {
            return res.sendStatus(404);
        }
    } catch (error) {
        return res.sendStatus(401);
    }
    
    req.userObject = input;
    next();
    return;
}

export async function checkOrderExists (req, res, next) {
    let {id} = req.params;

    try {
        const {rows} = await checkOrder(id);
        if (rows[0].count === "0") {
            return res.sendStatus(404);
        } else {

        }
    } catch (error) {
        return res.sendStatus(401);
    }

    req.userObject = id;
    next();
    return;
}

export async function checkOrderDelivered (req, res, next) {
    
    try {
        const {rows} = await checkDelivered(req.userObject);
        if (rows[0].isDelivered === true) {
            return res.sendStatus(400);
        } 
    } catch (error) {
        return res.sendStatus(401);
    }
    next();
    return;
}