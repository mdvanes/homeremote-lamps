// Sources: https://www.apollographql.com/docs/apollo-server/getting-started.html
// https://github.com/apollographql/fullstack-tutorial/blob/master/final/server/src/schema.js
// const { ApolloServer, gql } = require('apollo-server');
const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const app = express();
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

// Dummy REST api to see how this can be called with https://github.com/apollographql/apollo-link-rest
app.get('/api/numbers', (req, res) => {
  res.send({numbers: [1,2,3]});
});

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

// server.listen().then(({ url }) => {
//   console.log(`🚀  Server ready at ${url}`);
// Converted to integrate into Express: https://www.apollographql.com/docs/apollo-server/essentials/server.html#middleware
app.listen({ port: 4000 }, () => {
  console.log(`🚀  Server ready at http://localhost:4000${server.graphqlPath}`);
});