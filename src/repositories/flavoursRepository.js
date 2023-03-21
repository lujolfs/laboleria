import {db} from "../database/db.js";

export async function insertFlavour (flavour) {
    const {name} = flavour;
    return db.query(`
        INSERT INTO flavours
            (name)
        VALUES
            ($1);
    `, [name]);
}

export async function checkDoubles (input) {
    const {name} = input;

    return db.query(`
        SELECT COUNT
            (*)
        FROM
            flavours
        WHERE
            name=$1;
    `, [name]);
}