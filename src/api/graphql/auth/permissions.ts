import { allow, and, shield } from 'graphql-shield';
import { isAuthenticatedRule } from './rules';

export default shield(
  {
    Query: {
      '*': allow,
      currentUser: and(isAuthenticatedRule),
    },
  },
  { allowExternalErrors: true }
);
