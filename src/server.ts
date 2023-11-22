import { ApolloServer } from 'apollo-server';
import { PORT } from './config';
import { context } from './context/context';
import { resolvers } from './graphql/resolvers';
import { typeDefs } from './graphql/schema';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen({ port: PORT }, () => console.log(`Listen port ${PORT}...`));
