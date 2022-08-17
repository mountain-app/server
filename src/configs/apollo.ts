import { Config, ExpressContext } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'; // @todo Remove apollo-server-core in real production
import createContext from '../api/graphql/context';
import schema from '../api/graphql/schema';
import { logging } from '../logger';

const apolloConfig: Config<ExpressContext> = {
  schema,
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
