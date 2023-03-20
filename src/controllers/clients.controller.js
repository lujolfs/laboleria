import { insertClient } from "../repositories/clientsRepository.js";

export async function createClient (req, res) {
    try {
        await insertClient (req.userObject);
        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error.message);
    }
}