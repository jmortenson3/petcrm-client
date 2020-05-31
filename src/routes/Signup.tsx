import React, { useState, FormEvent } from 'react';
import { gql } from 'apollo-boost';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';

const SIGNUP = gql`
  mutation signup($username: String!, $password: String!) {
    signup(input: { username: $username, password: $password }) {
      id
      email
    }
  }
`;

const Signup = () => {
  const client = useApolloClient();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, { data, error }] = useMutation(SIGNUP);

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    console.log(
      `Signing up with username ${username} and password ${password}`
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
        <button type="submit">Signup</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
