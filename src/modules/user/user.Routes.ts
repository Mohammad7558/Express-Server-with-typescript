import express from 'express';
import auth from '../../middleware/auth';
import logger from '../../middleware/logger';
import { userControllers } from './user.controller';

const router = express.Router();

router.post('/', userControllers.createUser);

router.get('/', logger, auth(), userControllers.getUser);

router.get('/:id', userControllers.getSingleUser);

router.put('/:id', userControllers.updateSingleUser);

router.delete('/:id', userControllers.deleteUser);

export const userRoutes = router;
