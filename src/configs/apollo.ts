import { Config, ExpressContext } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'; // Remove apollo-server-core in real production
import createContext from '../api/graphql/context';
import schema from '../api/graphql/schema';
import { logging } from '../logger';

const apolloConfig: Config<ExpressContext> = {
  schema,
  csrfPrevention: true,
  cache: 'bounded',
  context: ({ req, res }) => createContext(req, res),
  plugins: [logging, ApolloServerPluginLandingPageGraphQLPlayground()], // Remove playground in real production
  introspection: true, // Remove in real production
};

export default apolloConfig;
