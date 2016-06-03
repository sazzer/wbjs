import express from 'express';
import graphqlHTTP from 'express-graphql';
import {schema} from './graphql/schema';
import expressBunyanLogger from 'express-bunyan-logger';

/**
 * Build the Express Server to use
 * @return {Express} the Express Server
 */
export function buildServer() {
  const app = express();

  app.use(expressBunyanLogger());
  app.use(expressBunyanLogger.errorLogger());

  app.use('/api/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
  }));

  return app;
}
