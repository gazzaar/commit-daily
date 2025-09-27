import { GraphQLClient } from 'graphql-request';
import { API_URL } from '../config';

export const gqlClient = new GraphQLClient(`${API_URL}/graphql`, {
  credentials: 'include',
  mode: 'cors',
});
