import React, { useState, FormEvent, FunctionComponent } from 'react';
import { gql } from 'apollo-boost';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
      id
      email
    }
  }
`;

const Button = styled.button`
  border-radius: ${(props) => props.theme.borderRadius};
`;

const Login: FunctionComponent = () => {
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
      const { id, email } = result.data.login;
      console.log(result);
      client.writeData({
        data: {
          isAuthed: true,
          user: {
            id,
            email,
          },
        },
      });
    } catch (err) {
      console.log(`caught error: ${JSON.stringify(err)}`);
    }
  };

  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={handleLogin}>
        <label>Username</label>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}></input>
        <label>Password</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}></input>
        <Button type="submit">Login</Button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
};

export default Login;
