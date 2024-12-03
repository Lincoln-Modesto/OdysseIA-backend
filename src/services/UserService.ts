import { findUserById } from '../repositories/UserRepository';
import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'defaultsecret';

export const getUserByToken = async (token: string) => {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
      const user = await findUserById(decoded.id);
      if (!user) {
        throw new Error('Usuário não encontrado');
      }
      return user;
    } catch (error) {
      throw new Error('Token inválido ou usuário não encontrado');
    }
  };