import { Router } from "express";
import { characterController } from "src/controllers/characterController";

const characterRouter = Router();

characterRouter.get('/', characterController.getCharacters);

export default characterRouter;
