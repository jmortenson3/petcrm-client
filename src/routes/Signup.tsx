import React, { useState, FormEvent, FunctionComponent } from 'react';
import { gql } from 'apollo-boost';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';

const SIGNUP = gql`
  mutation signup($username: String!, $password: String!) {
    signup(input: { username: $username, password: $password }) {
      id
      email
    }
  }
`;
type SignupProps = {
  isAuthed: boolean | undefined;
};

const Button = styled.button`
  border-radius: ${(props) => props.theme.borderRadius};
`;

const Login: FunctionComponent<SignupProps> = ({ children, isAuthed }) => {
  const client = useApolloClient();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signup, { data, error }] = useMutation(SIGNUP);

  if (isAuthed) {
    return <Redirect to="/app" />;
  }

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    console.log(
      `Signing up with username ${username} and password ${password}`
    );

    try {
      await signup({ variables: { username, password } });
    } catch (err) {
      console.log(`caught error: ${JSON.stringify(err)}`);
    }
  };

  if (data) {
    console.log(`[Signup] data: ${JSON.stringify(data)}`);
    const { id, email } = data.signup;
    client.writeData({
      data: {
        isAuthed: true,
        user: {
          id,
          email,
        },
      },
    });
    return <Redirect to="/app" />;
  }

  console.log(`[Signup] rendering...`);

  return (
    <div>
      <h3>Signup</h3>
      <form onSubmit={handleSignup}>
        <label>Username</label>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}></input>
        <label>Password</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}></input>
        <Button type="submit">Signup</Button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Login;
