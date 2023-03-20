import { checkClientOrder, insertClient } from "../repositories/clientsRepository.js";

export async function createClient (req, res) {
    try {
        await insertClient (req.userObject);
        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function findClientOrders (req, res) {
    let {id} = req.params;
    try {
        const clientObj = await checkClientOrder(id);
        if (clientObj.rowCount === 0) {
            res.sendStatus(404);
        } else {
        res.status(200).send(clientObj.rows);
        }
    } catch (error) {
        res.status(500).send(error.message); 
    }
}