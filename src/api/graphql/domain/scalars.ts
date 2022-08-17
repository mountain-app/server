import { GraphQLDateTime, GraphQLEmailAddress } from 'graphql-scalars';
import { asNexusMethod } from 'nexus';

/**
 * @description A field whose value conforms to the standard internet email address format
 * @see https://www.w3.org/Protocols/rfc822/
 * @example 'example@email.com'
 */
export const Email = asNexusMethod(GraphQLEmailAddress, 'email');

/**
 * @description A date-time string at UTC compliant with the `date-time` format
 * @see https://tools.ietf.org/html/rfc3339#section-5.6
 * @example '2020-01-01T00:00:00Z'
 */
export const DateTime = asNexusMethod(GraphQLDateTime, 'dateTime');
