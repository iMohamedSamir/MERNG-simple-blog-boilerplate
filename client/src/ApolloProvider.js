import React from "react";
import App from "./App";

import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
  concat,
} from "@apollo/client";

const gqluri = "https://gqlbe-api.herokuapp.com/" || "http://localhost:4000";
const httpLink = new HttpLink({ uri: gqluri });

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${localStorage.getItem("jwtToken") || null}`,
    },
  }));

  return forward(operation);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
