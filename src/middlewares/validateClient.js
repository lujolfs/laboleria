import { clientSchema } from "../modules/clients.module.js";

export async function schemaValidateClient (req, res, next) {
    let input = req.body;

    const {error} = clientSchema.validate(input, {abortEarly: false});

    if (error) {
        return res.sendStatus(400);
    }
    
    req.userObject = input;
    next();
    return;
}