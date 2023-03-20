import {db} from "../database/db.js";

export async function insertOrder(order) {
    const {clientId, cakeId, quantity, totalPrice, createdAt} = order;
    return db.query(`
        INSERT INTO orders
            ("clientId", "cakeId", quantity, "totalPrice", "createdAt")
        VALUES
            ($1, $2, $3, $4, $5);
    `, [clientId, cakeId, quantity, totalPrice, createdAt]);
}

export async function checkClient (input) {
    const {clientId} = input;

    return db.query(`
        SELECT COUNT
            (*)
        FROM
            clients
        WHERE
            id=$1;
    `, [clientId]);
}

export async function checkCake (input) {
    const {cakeId} = input;

    return db.query(`
        SELECT COUNT
            (*)
        FROM
            cakes
        WHERE
            id=$1;
    `, [cakeId]);
}