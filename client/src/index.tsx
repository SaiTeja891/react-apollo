import React from "react";
import ReactDOM from "react-dom/client";
import { Listings } from "./sections";
import reportWebVitals from "./reportWebVitals";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "./styles/index.css";

const client = new ApolloClient({
  uri: "/api",
  cache: new InMemoryCache(),
});
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ApolloProvider client={client}>
    <Listings title="TinyHouse Listings" />
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
