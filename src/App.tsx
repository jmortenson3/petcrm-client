import React from 'react';
import OrganizationsList from './OrganizationsList';
import NavBar from './navbar/NavBar';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

export const GET_USER = gql`
  query GetUser {
    email @client
  }
`;

const GetUser = () => {
  const { data } = useQuery(GET_USER);
  return <p>{/* This is you: <strong>{data.email}</strong> */}</p>;
};

const App = () => {
  return (
    <div className="App">
      <h2>My first Apollo app 🚀</h2>
      <GetUser />
      <NavBar />
      <OrganizationsList />
    </div>
  );
};

export default App;
