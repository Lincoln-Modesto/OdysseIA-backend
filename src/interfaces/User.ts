import { ObjectId } from 'mongoose';

export interface IUser {
  id?: string
  name: string;
  email: string;
  password: string;
  trips?: ObjectId;
}

export interface MyContext {
  user: null | {
    id: string;
    email: string;
  };
}