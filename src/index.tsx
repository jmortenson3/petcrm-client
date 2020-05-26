import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { createHttpLink } from 'apollo-link-http';
import App from './App';
import * as serviceWorker from './serviceWorker';

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
  credentials: 'include',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
