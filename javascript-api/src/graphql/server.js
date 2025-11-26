const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../../.env') });

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const app = express();
const PORT = process.env.GRAPHQL_PORT || 4000;

app.use(cors());

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true
  });

  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  app.listen(PORT, () => {
    console.log(`GraphQL API running on http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer().catch(err => {
  console.error('Error starting GraphQL server:', err);
});

module.exports = app;
