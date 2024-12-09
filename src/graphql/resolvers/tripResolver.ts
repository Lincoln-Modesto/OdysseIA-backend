import { ITrip } from '@src/interfaces/Trip';
import { TripService } from '../../services/TripService';

export const tripResolver = {
  Query: {
    getTrip: async (_: any, { id }: { id: string }) => {
      return await TripService.getTripById(id);
    },
    getTripsByUser: async (_: any, { userId }: { userId: string }) => {
      return await TripService.getTripsByUserId(userId);
    },
    listTrips: async (_: any, { userId }: { userId: string }) => {
      return await TripService.listTrips(userId);
    },
  },
  Mutation: {
    createTrip: async (_: any, payload: ITrip) => {
      return await TripService.create(payload);
    },
    updateTrip: async (_: any, { id, ...rest }: ITrip) => {
      return await TripService.update(id as string, rest);
    },
  },
};
