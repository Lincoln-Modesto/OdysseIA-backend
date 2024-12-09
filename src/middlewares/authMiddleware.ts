import { CustomError } from '../utils/CustomError';
import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'defaultsecret';

export const authMiddleware = (token: string | undefined) => {
  if (!token) {
    throw new CustomError('Token não fornecido', 401);
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    return decoded;
  } catch (error) {
    throw new CustomError('Token inválido', 401);
  }
};
