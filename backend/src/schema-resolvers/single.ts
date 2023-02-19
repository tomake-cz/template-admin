import { gql } from 'graphql-tag';
import { Resolvers } from '../types/resolvers-types';

export const typeDef = gql`
  extend type Query {
    single: Single
  }

  type Single {
    id: Int!
    name: String
    text: String
    number: Int
  }

  extend type Mutation {
    updateSingle(name: String, text: String, number: Int): SingleResponse
  }

  type SingleResponse {
    code: Int!
    success: Boolean!
    message: String!
    single: Single
  }
`;

export const resolvers: Resolvers = {
  Query: {
    single: async (parent, args, { dataSources }) => {
      return dataSources.singleAPI.getSingle();
    },
  },
  Mutation: {
    updateSingle: async (parent, args, { dataSources }) => {
      try {
        const { name, text, number } = args;
        const single = await dataSources.singleAPI.updateSingle({
          name,
          text,
          number,
        });
        return {
          code: 200,
          success: true,
          message: 'Successfully updated single with provided values',
          single,
        };
      } catch (e: any) {
        return {
          code: 500,
          success: false,
          message: e.extensions?.response?.body ?? e,
          single: null,
        };
      }
    },
  },
};
