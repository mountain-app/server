import { allow, shield } from 'graphql-shield';

export default shield(
  {
    Query: {
      '*': allow,
      // getUsers: and(isAuthenticatedRule),
    },
  },
  { allowExternalErrors: true }
);
