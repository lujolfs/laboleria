import { orderSchema } from "../modules/orders.module.js"
import { checkCake, checkClient } from "../repositories/ordersRepository.js";

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