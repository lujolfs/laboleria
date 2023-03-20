import joi from "joi";

export const clientSchema = joi.object({
    name: joi.string().min(1).required(),
    address: joi.string().required(),
    phone: joi.number().integer().min(1000000000).max(99999999999)
})