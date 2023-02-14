// graphql imports
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { json } from 'body-parser';
// mocks
import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';
import mocks from './mocks.js';
// datasources
import { TestAPI } from './datasources/testAPI.js';
// prisma
import { prisma } from './prisma/script.js';
// schema-resolvers
import { typeDef as Query, resolvers as queryRes, } from './schema-resolvers/query.js';
import { typeDef as Test, resolvers as testRes, } from './schema-resolvers/test.js';
// other imports
import lodash from 'lodash';
const { merge } = lodash;
const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
    schema: addMocksToSchema({
        schema: makeExecutableSchema({
            typeDefs: [Query, Test],
            resolvers: merge(queryRes, testRes),
        }),
        mocks,
    }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();
app.use('/graphql', cors(), json(), expressMiddleware(server, {
    context: async ({ req }) => ({
        token: req.headers.token,
        dataSources: { testAPI: new TestAPI({ prisma }) },
    }),
}));
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/graphql`);
