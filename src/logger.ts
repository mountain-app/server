import { GraphQLRequestContext } from 'apollo-server-types';
import pino from 'pino';
import loggerConfig from './configs/logger';

const logger = pino(loggerConfig);

export default logger;

export const logging = {
  async requestDidStart(requestContext: GraphQLRequestContext) {
    const { query, variables } = requestContext.request;

    logger.info(`Request:\n${query}`);
    logger.info(`Variables:\n${JSON.stringify(variables)}`);

    return {
      async didEncounterErrors() {
        requestContext.errors!.forEach((error) => logger.error(error));
      },

      async willSendResponse() {
        logger.info(
          `Response:\n${JSON.stringify(requestContext.response!.data)}`
        );
      },
    };
  },
};
