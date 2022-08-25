import { Config, ExpressContext } from 'apollo-server-express';
import { applyMiddleware } from 'graphql-middleware';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import createContext from '../api/graphql/context';
import schema from '../api/graphql/schema';
import { logging } from '../logger';
import permissions from '../api/graphql/auth/permissions';

const apolloConfig: Config<ExpressContext> = {
  schema: applyMiddleware(schema, permissions),
  csrfPrevention: true,
  cache: 'bounded',
  context: ({ req, res }) => createContext(req, res),
  plugins: [
    logging,
    process.env.NODE_ENV === 'production'
      ? ApolloServerPluginLandingPageGraphQLPlayground()
      : {},
  ], // @todo Remove playground in real production
  introspection: true, // @todo Remove in real production
};

export default apolloConfig;
