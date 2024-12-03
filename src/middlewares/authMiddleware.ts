import { CustomError } from '../utils/CustomError';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'defaultsecret';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): any => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch (error) {
    if (error instanceof Error) {
      return next(new CustomError('Token inválido', 401));
    }
    return next(new CustomError('Erro ao verificar o token', 500));
  }
};
