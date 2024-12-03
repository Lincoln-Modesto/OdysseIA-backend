import express, { Request, Response } from 'express';
import { connectDB } from './database';
import { errorHandler } from './middlewares/errorHandle';
import authRoutes from './routes/authRoutes'
import * as dotenv from 'dotenv';

const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();
connectDB();

app.use(express.json());
app.use(errorHandler);
app.get('/', (req: Request, res: Response) => {
  res.send('Bem-vindo à OdysseIA!');
});
app.use('/auth', authRoutes); 
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
