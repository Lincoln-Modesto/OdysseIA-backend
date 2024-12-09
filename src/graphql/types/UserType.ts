import { gql } from 'graphql-tag';

export const UserType = gql`
  directive @auth on FIELD_DEFINITION

  type User {
    id: ID!
    name: String!
    email: String!
    trips: [Trip]
  }

  input TripInput {
    id: ID
    destination: String!
    startDate: String
    endDate: String
  }

  input CreateUserInput {
    name: String!
    email: String!
    password: String!
  }

  type Query {
    getUser(id: ID!): User @auth
    getUserByEmail(email: String): User @auth
  }

  type Mutation {
    updateUser(id: ID!, name: String!, email: String!, trips: [TripInput]): User @auth
    createUser(email: String!, password: String!): User
  }
`;
