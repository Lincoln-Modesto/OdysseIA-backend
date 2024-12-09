import { ObjectId } from 'mongoose';

export interface ITrip {
  id?: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  createdBy: ObjectId;
}
