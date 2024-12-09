import { userResolver } from './userResolver';
import { tripResolver } from './tripResolver';
import { mergeResolvers } from '@graphql-tools/merge';

export const resolvers = mergeResolvers([userResolver, tripResolver]);
