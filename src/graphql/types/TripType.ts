import { gql } from 'graphql-tag';

export const TripType = gql`
  directive @auth on FIELD_DEFINITION

  type Trip {
    id: ID!
    destination: String!
    startDate: String!
    endDate: String!
    user: User
  }

  input CreateTripInput {
    destination: String!
    startDate: String!
    endDate: String!
    userId: ID!
  }

  type Query {
    getTrip(id: ID!): Trip @auth
    listTrips: [Trip] @auth
    getTripsByUser(userId: ID!): [Trip] @auth
  }

  type Mutation {
    createTrip(input: CreateTripInput): Trip @auth
    updateTrip(id: ID!, destination: String, startDate: String, endDate: String): Trip @auth
  }
`;
