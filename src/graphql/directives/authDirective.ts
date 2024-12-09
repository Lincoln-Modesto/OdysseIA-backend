import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils';
import { GraphQLSchema } from 'graphql';
import { authMiddleware } from '../../middlewares/authMiddleware';

export const authDirectiveTransformer = (schema: GraphQLSchema) => {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: fieldConfig => {
      const authDirective = getDirective(schema, fieldConfig, 'auth')?.[0];

      if (authDirective) {
        const { resolve = fieldConfig.resolve } = fieldConfig;

        fieldConfig.resolve = async function (...args) {
          const [, , context] = args;

          const token = context.token;
          if (!token) {
            throw new Error('Acesso negado. Token não fornecido.');
          }

          const user = await authMiddleware(token);
          if (!user) {
            throw new Error('Acesso negado. Token inválido ou expirado.');
          }

          context.user = user;

          return resolve ? resolve.apply(this, args) : null;
        };
      }
      return fieldConfig;
    },
  });
};
