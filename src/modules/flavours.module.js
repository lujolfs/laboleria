import joi from "joi";

export const flavourSchema = joi.object({
    name: joi.string().min(2).required()
});