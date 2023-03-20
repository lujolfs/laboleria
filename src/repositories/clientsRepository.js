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