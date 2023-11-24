import { PORT } from './config';
import context from './context/context';
import { resolvers } from './graphql/resolvers';
import { typeDefs } from './graphql/schema';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { applyMiddleware } from 'graphql-middleware';
import { permissions } from './security/shileds';
import { ApolloServer } from 'apollo-server-express';

const app = express();

app.use(cookieParser());

app.use(cors());

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.get('/', (req, res) => {
  res.send(`Response from process ${process.pid}`);
});

const schema = makeExecutableSchema({ typeDefs, resolvers });
const schemaWithMiddleware = applyMiddleware(schema, permissions);

const apollo = new ApolloServer({
  schema: schemaWithMiddleware,
  introspection: process.env.ENV_NAME !== 'production',
  context,
  plugins:
    process.env.ENV_NAME !== 'production'
      ? [ApolloServerPluginLandingPageGraphQLPlayground()]
      : [],
});

export const startServer = async () => {
  await apollo.start();

  apollo.applyMiddleware({
    app,
  });

  app.listen({ port: PORT }, () =>
    console.log(`Listen port ${process.env.PORT || 8080}...`)
  );
};
