import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import { createHttpLink } from 'apollo-link-http';
import { gql } from 'apollo-boost';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { typeDefs, resolvers } from './resolvers';
import './index.css';
import Login from './auth/Login';

const cache = new InMemoryCache();

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
  credentials: 'include',
});

const client = new ApolloClient({
  link: httpLink,
  cache,
  typeDefs,
  resolvers,
});

cache.writeData({
  data: {
    isLoggedIn: false,
    user: {},
  },
});

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

const IsLoggedIn = () => {
  const { data } = useQuery(IS_LOGGED_IN);
  return data.isLoggedIn ? <App /> : <Login />;
};

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <IsLoggedIn />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
