import { flavourSchema } from "../modules/flavours.module.js";
import { checkDoubles } from "../repositories/flavoursRepository.js";

export async function schemaValidateFlavour (req, res, next) {
    let input = req.body;

    const {error} = flavourSchema.validate(input, {abortEarly: false});

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).send(errors);
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