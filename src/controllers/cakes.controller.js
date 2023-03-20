import { insertCake } from "../repositories/cakesRepository.js";

export async function createCake (req, res) {
    try {
        await insertCake(req.userObject);
        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error.message);
    }
}