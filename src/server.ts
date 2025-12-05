import express, { Request, Response } from 'express';
import config from './config';
import initDb, { pool } from './config/db';
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

// * ============** update User from DB ↓ **=============
app.put('/users/:id', async (req: Request, res: Response) => {
  // console.log(req.params.id);
  const { name, email } = req.body;
  try {
    const result = await pool.query(
      `UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *`,
      [name, email, req.params.id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: 'User Not Found',
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'User updated successfully',
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// * ============** Delete User from DB ↓ **=============
app.delete('/users/:id', async (req: Request, res: Response) => {
  // console.log(req.params.id);
  try {
    const result = await pool.query(`DELETE FROM users WHERE id = $1`, [
      req.params.id,
    ]);

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: 'User Not Found',
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'User deleted successfully',
        data: result.rows,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// crud todos
app.post('/todos', async (req: Request, res: Response) => {
  const { user_id, title } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO todos(user_id, title) VALUES($1, $2) RETURNING *`,
      [user_id, title]
    );
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
});

app.get('/todos', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM todos`);
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
});

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
