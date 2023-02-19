import { gql } from 'graphql-tag';
import { Mutation } from '../types/resolvers-types';

export const typeDef = gql`
  type Mutation {
    _empty: String
  }
`;

export const resolvers: Mutation = {};
