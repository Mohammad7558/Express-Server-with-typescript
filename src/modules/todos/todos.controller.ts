import { Request, Response } from 'express';
import { createTodosService } from './todos.service';

const createTodos = async (req: Request, res: Response) => {
  const { user_id, title } = req.body;

  try {
    const result = await createTodosService.createTodos(user_id, title);
    res.status(201).json({
      success: true,
      message: 'Todos created',
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getTodos = async (req: Request, res: Response) => {
  try {
    const result = await createTodosService.getTodos();
    res.status(200).json({
      success: true,
      message: 'todos retried successfully',
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      details: err,
    });
  }
};

export const todosController = {
  createTodos,
  getTodos,
};
