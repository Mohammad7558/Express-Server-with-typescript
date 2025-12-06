import express from 'express';
import { todosController } from './todos.controller';

const router = express.Router();

router.post('/', todosController.createTodos);

router.get('/', todosController.getTodos);

export const useTodosRoute = router;
