import { IUser } from '../interfaces/User';
import { User } from '../models/User';

export const findUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};

export const findUserById = async (id: string) => {
  return await User.findOne({ id });
};

export const createUser = async (userData: IUser) => {
  const user = new User(userData);
  return await user.save();
};

export const updateUser = async (id: string, updates: Partial<IUser>) => {
  return await User.findByIdAndUpdate(id, updates, { new: true }).exec();
};
