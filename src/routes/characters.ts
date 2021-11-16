import { Router } from "express";
import { movieController } from "src/controllers/movieController";

const movieRouter = Router();

movieRouter.get('/', movieController.getMovies);

export default movieRouter;
