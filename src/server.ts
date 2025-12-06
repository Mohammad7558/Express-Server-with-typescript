import express, { Request, Response } from 'express';
import config from './config';
import initDb from './config/db';
import { useTodosRoute } from './modules/todos/todos.route';
import { userRoutes } from './modules/user/user.Routes';

const app = express();
const port = config.port;
// parser
app.use(express.json());
// app.use(express.urlencoded());

initDb();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello!');
});

// ?  ========== *********** users CRUD *********** ================= //

app.use('/users', userRoutes);

// crud todos

app.use('/todos', useTodosRoute);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route Not Found',
    path: req.path,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
