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

export async function checkClient(input) {
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

export async function checkCake(input) {
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

export async function buildOrder() {
    return db.query(`
    SELECT 
        json_build_object(
        'id', clients.id,
        'name', clients.name,
        'address', clients.address,
        'phone', clients.phone)AS client,
        json_build_object(
        'id', cakes.id,
        'name', cakes.name,
        'price', cakes.price,
        'description', cakes.description,
        'image', cakes.image)AS cake,
        to_char(orders."createdAt"::timestamp, 'YYYY-MM-DD HH24:MI') AS "createdAt",
        orders.quantity,
        orders."totalPrice"
    FROM
	    orders
    JOIN
	    clients
    ON
	    orders."clientId" = clients.id
    JOIN
	    cakes
    ON
	    orders."cakeId" = cakes.id;
    `)
}

export async function buildOrderQuery(input) {
    return db.query(`
    SELECT 
        json_build_object(
        'id', clients.id,
        'name', clients.name,
        'address', clients.address,
        'phone', clients.phone)AS client,
        json_build_object(
        'id', cakes.id,
        'name', cakes.name,
        'price', cakes.price,
        'description', cakes.description,
        'image', cakes.image)AS cake,
        to_char(orders."createdAt"::timestamp, 'YYYY-MM-DD HH24:MI') AS "createdAt",
        orders.quantity,
        orders."totalPrice"
    FROM
	    orders
    JOIN
	    clients
    ON
	    orders."clientId" = clients.id
    JOIN
	    cakes
    ON
	    orders."cakeId" = cakes.id
    WHERE
        DATE(orders."createdAt")=$1;
    `, [input])
}

export async function buildOrderId(input) {
    return db.query(`
    SELECT 
        json_build_object(
        'id', clients.id,
        'name', clients.name,
        'address', clients.address,
        'phone', clients.phone)AS client,
        json_build_object(
        'id', cakes.id,
        'name', cakes.name,
        'price', cakes.price,
        'description', cakes.description,
        'image', cakes.image)AS cake,
        to_char(orders."createdAt"::timestamp, 'YYYY-MM-DD HH24:MI') AS "createdAt",
        orders.quantity,
        orders."totalPrice"
    FROM
	    orders
    JOIN
	    clients
    ON
	    orders."clientId" = clients.id
    JOIN
	    cakes
    ON
	    orders."cakeId" = cakes.id
    WHERE
        orders.id=$1;
    `, [input])
}