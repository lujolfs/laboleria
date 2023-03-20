import {Router} from "express";
import { createCake } from "../controllers/cakes.controller.js";
import { schemaValidateRecipe } from "../middlewares/validateCake.js";

const cakeRouter = Router();

cakeRouter.post("/cakes", schemaValidateRecipe, createCake);

export default cakeRouter;