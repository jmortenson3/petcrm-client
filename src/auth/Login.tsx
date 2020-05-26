import React, { useState, FormEvent } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
    }
  }
`;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, { data, error }] = useMutation(LOGIN);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    console.log(
      `Logging in with username ${username} and password ${password}`
    );

    await login({ variables: { username, password } });
    if (error) {
      console.log(JSON.stringify(error));
    }
    console.log(JSON.stringify(data));
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
