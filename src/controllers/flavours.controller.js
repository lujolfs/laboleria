import { insertFlavour } from "../repositories/flavoursRepository.js";

export async function createFlavour (req, res) {
    try {
        await insertFlavour (req.userObject);
        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error.message);
    }
}