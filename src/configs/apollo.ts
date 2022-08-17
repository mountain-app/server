import { ApolloServerExpressConfig } from 'apollo-server-express';
import createContext from '../api/graphql/context';
import schema from '../api/graphql/schema';
import { logging } from '../logger';

const apolloConfig: ApolloServerExpressConfig = {
  schema,
  csrfPrevention: true,
  cache: 'bounded',
  context: ({ req, res }) => createContext(req, res),
  plugins: [logging],
};

export default apolloConfig;
