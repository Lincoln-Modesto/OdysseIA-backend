import { IUser } from '@src/interfaces/User';
import { UserService } from '../../services/UserService';

export const userResolver = {
  Query: {
    getUser: async (_: any, { id }: { id: string }) => {
      return await UserService.getById(id);
    },
    getUserByEmail: async (_: any, { email }: { email: string }) => {
      return await UserService.getByEmail(email);
    },
  },
  Mutation: {
    createUser: async (_: any, user: IUser) => {
      return await UserService.create(user);
    },
    updateUser: async (_: any, { id, ...rest }: IUser) => {
      return await UserService.update(id as string, rest);
    },
  },
};
