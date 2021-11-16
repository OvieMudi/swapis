import { Router } from 'express';
import characterRouter from './characters';
import movieRouter from './movies';

const baseRouter = Router();

baseRouter.use('/movies', movieRouter);
baseRouter.use('/characters', characterRouter);

export default baseRouter;
