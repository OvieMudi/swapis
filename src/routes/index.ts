import { Router } from 'express';
import movieRouter from './movies';

const baseRouter = Router();
baseRouter.use('/movies', movieRouter);
export default baseRouter;
