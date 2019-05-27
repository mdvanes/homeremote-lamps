import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { defaults, resolvers } from "./Resolvers";

const cache = new InMemoryCache();

cache.writeData({
  data: defaults
});

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  resolvers,
  cache
  // Does not work with Apollo Boost?
  // connectToDevTools: true
});

// client
//   .query({
//     query: gql`
//       {
//         rates(currency: "USD") {
//           currency
//         }
//       }
//     `
//   })
//   .then(result => console.log('graphql result:', result));

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
