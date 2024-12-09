import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { authDirectiveTransformer } from './graphql/directives/authDirective';
import { typeDefs } from './graphql/types';
import { resolvers } from './graphql/resolvers';
import { Context } from 'vm';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const schemaWithAuth = authDirectiveTransformer(schema);

const server = new ApolloServer({
  schema: schemaWithAuth,
});

(async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }): Promise<Context> => {
      const token = req.headers.authorization?.split(' ')[1] || null;
      return { token };
    },
  });
  console.log(`🚀 Servidor rodando em: ${url}`);
})();
