import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import { createHttpLink, HttpLink } from 'apollo-link-http';
import { gql } from 'apollo-boost';
import App from './routes/App';
import * as serviceWorker from './serviceWorker';
import { typeDefs, resolvers } from './resolvers';
import './index.css';
import { ThemeProvider } from 'styled-components';
import { theme } from './Theme';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes/Router';
import AutoLoginWrapper from './components/wrappers/AutoLoginWrapper';

const cache = new InMemoryCache();

const link = createHttpLink({
  uri: 'http://localhost:3001/graphql',
  credentials: 'include',
});

const client = new ApolloClient({
  link,
  cache,
  typeDefs,
  resolvers,
});

console.log('[index] Writing cache');
cache.writeData({
  data: {
    isAuthed: undefined,
    user: {},
  },
});
console.log('[index] Finished writing cache');

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        {/* <React.StrictMode> */}
        <AutoLoginWrapper>
          <Router />
        </AutoLoginWrapper>
        {/* </React.StrictMode> */}
      </ThemeProvider>
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
