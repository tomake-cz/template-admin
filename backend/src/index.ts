/* eslint-disable import/first */

// graphql imports
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
const { json } = bodyParser;

// node
import path from 'path';
import { existsSync } from 'fs';

// mocks
import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';
import mocks from './mocks.js';

// datasources
import { TestAPI } from './datasources/testAPI.js';

// prisma
import { prisma } from './prisma/script.js';

// schema-resolvers
import {
  typeDef as Query,
  resolvers as queryRes,
} from './schema-resolvers/query.js';
import {
  typeDef as Test,
  resolvers as testRes,
} from './schema-resolvers/test.js';

// other imports
import lodash from 'lodash';
const { merge } = lodash;

export interface Context {
  token?: string | string[];
  dataSources: {
    testAPI: TestAPI;
  };
}

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer<Context>({
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
app.use(
  '/graphql',
  cors<cors.CorsRequest>(),
  json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({
      token: req.headers.token,
      dataSources: { testAPI: new TestAPI({ prisma }) },
    }),
  })
);

const FRONTEND_PATH = '../frontend';
const DIST_PATH = FRONTEND_PATH + '/dist';

app.use(express.static(DIST_PATH));

app.get('/index', (req, res) => {
  res.redirect('/');
});

app.get('*', (req, res) => {
  console.log(req.originalUrl);

  const filename = req.originalUrl === '/' ? '/index' : req.originalUrl;

  const filepath = path.resolve(DIST_PATH + filename + '.html');

  if (!existsSync(filepath)) {
    res.status(404).send('Page not found');
    return;
  }

  res.sendFile(filepath);
});

await new Promise<void>((resolve) =>
  httpServer.listen({ port: 4000 }, resolve)
);
console.log(`🚀 Server ready at http://localhost:4000/graphql`);
