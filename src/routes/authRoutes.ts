import { Router } from 'express';
import { login } from '../controllers/AuthController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { getUserByToken } from '../services/UserService';
import { CustomError } from '../utils/CustomError';

const router = Router();

router.post('/login', login);

router.get('/protected', authMiddleware, async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] as string;
    const user = await getUserByToken(token);
    res.status(200).json({ message: 'Você está autenticado!', user });
  } catch (error) {
    next(new CustomError('Erro ao acessar recurso protegido', 400));
  }
});

export default router;
