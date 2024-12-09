
import jwt, { JwtPayload } from 'jsonwebtoken';
import { CustomError } from '../utils/CustomError';
import {
  findUserById,
  findUserByEmail,
  createUser,
  updateUser,
} from '../repositories/UserRepository';
import { IUser } from '../interfaces/User';

const JWT_SECRET = process.env.JWT_SECRET || 'defaultsecret';

export const UserService = {
  getUserByToken: async (token: string) => {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
      const user = await findUserById(decoded.id);
      if (!user) {
        throw new CustomError('Usuário não encontrado', 404);
      }
      return user;
    } catch (error) {
      throw new CustomError('Token inválido ou usuário não encontrado', 401);
    }
  },

  create: async (payload: IUser) => {
    try {
      const existingUser = await findUserByEmail(payload.email);
      if (existingUser) {
        throw new CustomError('E-mail já cadastrado', 409);
      }

      const user = await createUser(payload);
      return user;
    } catch (error) {
      throw new CustomError(
        'Erro ao criar usuário: ' +
          (error instanceof Error ? error.message : error),
        400
      );
    }
  },

  update: async (
    id: string,
    updates: Partial<IUser>
  ) => {
    try {
      const user = await updateUser(id, updates);
      if (!user) {
        throw new CustomError('Usuário não encontrado', 404);
      }
      return user;
    } catch (error) {
      throw new CustomError(
        'Erro ao atualizar usuário: ' +
          (error instanceof Error ? error.message : error),
        400
      );
    }
  },

  getById: async (id: string) => {
    try {
      const user = await findUserById(id);
      if (!user) {
        throw new CustomError('Usuário não encontrado', 404);
      }
      return user;
    } catch (error) {
      throw new CustomError(
        'Erro ao buscar usuário por ID: ' +
          (error instanceof Error ? error.message : error),
        400
      );
    }
  },

  getByEmail: async (email: string) => {
    try {
      const user = await findUserByEmail(email);
      if (!user) {
        throw new CustomError('Usuário não encontrado com esse e-mail', 404);
      }
      return user;
    } catch (error) {
      throw new CustomError(
        'Erro ao buscar usuário por e-mail: ' +
          (error instanceof Error ? error.message : error),
        400
      );
    }
  },
};
