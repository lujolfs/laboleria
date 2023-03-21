import {Router} from "express";
import {createFlavour} from "../controllers/flavours.controller.js"
import { schemaValidateFlavour } from "../middlewares/validateFlavour.js";

const flavourRouter = Router();

flavourRouter.post("/flavours", schemaValidateFlavour, createFlavour);

export default flavourRouter;