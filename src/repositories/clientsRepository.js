import {db} from "../database/db.js";

export async function insertClient (user) {
    const {name, address, phone} = user;
    return db.query(`
        INSERT INTO clients
            (name, address, phone)
        VALUES
            ($1, $2, $3);
    `, [name, address, phone]);
}

export async function checkDoubles (input) {
    const {name} = input;

    return db.query(`
        SELECT COUNT
            (*)
        FROM
            cakes
        WHERE
            name=$1;
    `, [name]);
}

export async function checkClientOrder (input) {
    const id = input
    
    return db.query(`
    SELECT
		orders.id AS orderId,
		orders.quantity AS quantity,
    	to_char(orders."createdAt"::timestamp, 'YYYY-MM-DD HH24:MI') AS "createdAt",
    	orders."totalPrice" AS totalPrice,
    	cakes.name as "cakeName"
    FROM
        orders
    JOIN
        clients
    ON
       clients.id = orders."clientId" 
    JOIN
        cakes
    ON
        cakes.id = orders."cakeId"
	WHERE
		clients.id=$1;
    `, [id])
}