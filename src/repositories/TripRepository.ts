import { Trip } from '../models/Trip';

export const findTripsByUserId = async (userId: string) => {
  return await Trip.find({ user: userId }).exec();
};

export const findTripById = async (id: string) => {
  return await Trip.findById(id).populate('user');
};

export const listTrips = async (userId: string) => {
  return await Trip.find({ user: userId }).populate('user');
};

export const createTrip = async (input: any) => {
  const trip = new Trip(input);
  return await trip.save();
};

export const updateTrip = async (id: string, data: any) => {
  return await Trip.findByIdAndUpdate(id, data, { new: true });
};
