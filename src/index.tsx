import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { createHttpLink } from 'apollo-link-http';
import * as serviceWorker from './serviceWorker';
import { typeDefs, resolvers } from './resolvers';
import './index.css';
import { ThemeProvider } from 'styled-components';
import { theme } from './Theme';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes/Router';
import AutoLoginWrapper from './components/wrappers/AutoLoginWrapper';
import config from './config';

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

cache.writeData({
  data: {
    isAuthed: null,
    user: {
      __typename: 'User',
      id: '',
      email: '',
    },
    context: {
      __typename: 'Context',
      organization: {
        __typename: 'Organization',
        id: localStorage.getItem(config.LS_KEYS.ORG_ID) || '',
      },
      location: {
        __typename: 'Location',
        id: localStorage.getItem(config.LS_KEYS.LOCATION_ID) || '',
      },
    },
  },
});

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
