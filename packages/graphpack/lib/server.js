import { ApolloServer } from 'apollo-server';
import { once } from 'ramda';
import { config, context, resolvers, typeDefs } from './srcFiles';

if (!(resolvers && Object.keys(resolvers).length > 0)) {
  throw Error(
    `Couldn't find any resolvers. Please add resolvers to your src/resolvers.js`,
  );
}

let options = {};

if (config) {
  // Renaming to avoid shadowing
  const {
    context: _context,
    resolvers: _resolvers,
    typeDefs: _typeDefs,
    applyMiddleware,
    ...rest
  } = config;
  options = rest;
}

const server = new ApolloServer({
  ...options,
  context,
  typeDefs,
  resolvers,
});

// Apply user provided middlewares
if (config && applyMiddleware && applyMiddleware.app) {
  server.applyMiddleware(applyMiddleware);
}

server
  .listen({ port: Number(process.env.PORT) || config ? config.port : 4000 })
  .then(({ url }) => console.log(`🚀 Server ready at ${url}`));

export default server;
