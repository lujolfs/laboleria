import { cakeSchema } from "../modules/cakes.module.js";
import { checkDoubles } from "../repositories/cakesRepository.js";

export async function schemaValidateRecipe (req, res, next) {
    let input = req.body;

    const {error} = cakeSchema.validate(input, {abortEarly: false});

    if (error) {
        const errors = error.details.map((msg) => msg.path[0]);
        if (errors == ("name" || "price" || "description")) {
            return res.sendStatus(400);
        } else {
            return (res.sendStatus(422));
        }
    }

    try {
        const {rows} = await checkDoubles(input);
        if (rows[0].count !== "0") {
            return res.sendStatus(409);
        }
    } catch (error) {
        return res.sendStatus(401);
    }

    req.userObject = input;
    next();
    return;
}