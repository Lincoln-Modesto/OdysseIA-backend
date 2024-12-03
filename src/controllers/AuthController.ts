import { NextFunction, Request, Response } from 'express';
import { getUserByToken } from '../services/UserService';
import { CustomError } from '../utils/CustomError';

export const login = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return new CustomError('Token não fornecido', 401)
    }

    const user = await getUserByToken(token);
    res.status(200).json({ message: 'Você está autenticado!', user });
  } catch (error) {
    next(new CustomError('Erro ao acessar recurso protegido', 400));
  }
};
