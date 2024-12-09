import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findUserByEmail } from '../repositories/UserRepository';
import { CustomError } from '@src/utils/CustomError';

const JWT_SECRET = process.env.JWT_SECRET || 'defaultsecret';

export const authenticateUser = async (email: string, password: string) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new CustomError('Usuário não encontrado.', 404);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new CustomError('Senha inválida.', 401);
  }

  const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: '1h',
  });

  return token;
};



