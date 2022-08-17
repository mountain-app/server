import {
  GraphQLDateTime,
  GraphQLEmailAddress,
  GraphQLUUID,
} from 'graphql-scalars';
import { asNexusMethod } from 'nexus';

/**
 * @description A field whose value conforms to the standard internet email address format
 * @see https://www.w3.org/Protocols/rfc822/
 * @example 'example@email.com'
 */
export const Email = asNexusMethod(GraphQLEmailAddress, 'email');

/**
 * @description A field whose value is a generic Universally Unique Identifier
 * @see https://en.wikipedia.org/wiki/Universally_unique_identifier
 * @example '75442486-0878-440c-9db1-a7006c25a39f'
 */
export const UUID = asNexusMethod(GraphQLUUID, 'uuid');

/**
 * @description A date-time string at UTC compliant with the `date-time` format
 * @see https://tools.ietf.org/html/rfc3339#section-5.6
 * @example '2020-01-01T00:00:00Z'
 */
export const DateTime = asNexusMethod(GraphQLDateTime, 'dateTime');
