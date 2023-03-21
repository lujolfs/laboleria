import {db} from "../database/db.js";

export async function insertCake (user) {
    const {name, price, description, image} = user;
    return db.query(`
        INSERT INTO cakes
            (name, price, description, image)
        VALUES
            ($1, $2, $3, $4);
    `, [name, price, description, image]);
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

export async function checkFlavour (input) {
    const {flavourId} = input;

    return db.query(`
        SELECT COUNT
            (*)
        FROM
            flavours
        WHERE
            id=$1;
    `, [flavourId])
}