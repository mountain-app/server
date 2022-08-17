import { makeSchema } from 'nexus';
import { join } from 'path';
import * as types from '..';

const schema = makeSchema({
  types,
  outputs: {
    schema: join(__dirname, 'index.graphql'),
    typegen: join(__dirname, '..', 'generated', 'nexus.ts'),
  },
  features: {
    abstractTypeStrategies: {
      resolveType: false,
    },
  },
  nonNullDefaults: {
    output: true,
    input: true,
  },
  contextType: {
    module: join(__dirname, '..', 'context.ts'),
    export: 'Context',
  },
});

export default schema;
