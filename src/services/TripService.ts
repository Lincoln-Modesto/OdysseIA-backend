import { CustomError } from './../utils/CustomError';
import { ITrip } from '../interfaces/Trip';
import { Trip } from '../models/Trip';

export const TripService = {
  getTripsByUserId: async (userId: string) => {
    try {
      const trips = await Trip.find({ user: userId }).populate('user');
      return trips;
    } catch (error) {
      throw new CustomError(
        'Erro ao buscar viagens pelo ID de usuário: ' +
          (error instanceof Error ? error.message : error),
        400
      );
    }
  },

  getTripById: async (id: string) => {
    try {
      const trip = await Trip.findById(id).populate('user');
      if (!trip) {
        throw new CustomError('Viagem não encontrada', 404);
      }
      return trip;
    } catch (error) {
      throw new CustomError(
        'Erro ao buscar viagem pelo ID: ' +
          (error instanceof Error ? error.message : error),
        400
      );
    }
  },

  listTrips: async (userId: string) => {
    try {
      const trips = await Trip.find({ user: userId }).populate('user');
      return trips;
    } catch (error) {
      throw new CustomError(
        'Erro ao listar viagens: ' +
          (error instanceof Error ? error.message : error),
        400
      );
    }
  },

  create: async (payload: ITrip) => {
    try {
      const trip = new Trip(payload);
      await trip.save();
      return trip;
    } catch (error) {
      throw new CustomError(
        'Erro ao criar viagem: ' +
          (error instanceof Error ? error.message : error),
        400
      );
    }
  },

  update: async (id: string, data: ITrip) => {
    try {
      const updatedTrip = await Trip.findByIdAndUpdate(id, data, { new: true });
      if (!updatedTrip) {
        throw new CustomError('Viagem não encontrada para atualização', 404);
      }
      return updatedTrip;
    } catch (error) {
      throw new CustomError(
        'Erro ao atualizar viagem: ' +
          (error instanceof Error ? error.message : error),
        400
      );
    }
  },
};
