import React, { FunctionComponent } from 'react';
import NavBar from '../components/navbar/NavBar';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const GET_CONTEXT = gql`
  query getContext {
    context @client {
      __typename
      organization {
        id
        __typename
      }
      location {
        id
        __typename
      }
    }
  }
`;

const App: FunctionComponent = ({ children }) => {
  const { data } = useQuery(GET_CONTEXT);

  return (
    <div className="App">
      <NavBar context={data.context} />
      {children}
    </div>
  );
};

export default App;
