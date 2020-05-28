import React, { useState, FormEvent } from 'react';
import { gql } from 'apollo-boost';
import { useMutation, useApolloClient } from '@apollo/react-hooks';

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
      id
      email
    }
  }
`;

const Login = () => {
  const client = useApolloClient();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, { data, error }] = useMutation(LOGIN);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    console.log(
      `Logging in with username ${username} and password ${password}`
    );

    try {
      const result = await login({ variables: { username, password } });
      client.writeData({
        data: {
          isLoggedIn: true,
        },
      });
    } catch (err) {
      console.log(`caught error: ${JSON.stringify(err)}`);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <label>Username</label>
      <input type="text" onChange={(e) => setUsername(e.target.value)}></input>
      <label>Password</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}></input>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
