import React, { useEffect } from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const AUTO_LOGIN = gql`
  mutation autoLogin {
    autoLogin {
      id
      email
    }
  }
`;

const AutoLoginWrapper: React.FC = ({ children }) => {
  const client = useApolloClient();
  const [autoLogin, { error, loading, data }] = useMutation(AUTO_LOGIN);

  useEffect(() => {
    console.log(`[AutoLoginWrapper] Begin useEffect()`);
    (async () => {
      try {
        console.log('[AutoLoginWrapper] Trying to auto-login');
        await autoLogin();
        console.log('[AutoLoginWrapper] auto login successful');
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  if (!data && !error && !loading) {
    console.log(`[AutoLoginWrapper] Fetch not started yet`);
    return null;
  }

  if (loading) {
    console.log(`[AutoLoginWrapper] We're still loading auto-login`);
    return null;
  }

  if (error) {
    console.log(`[AutoLoginWrapper] This is the error: ${error}`);
    client.writeData({
      data: {
        isAuthed: false,
      },
    });
  }

  if (data) {
    console.log(`[AutoLoginWrapper] data: ${JSON.stringify(data)}`);
    const { id, email } = data;
    client.writeData({
      data: {
        isAuthed: true,
        user: {
          id,
          email,
        },
      },
    });
    console.log(`[AutoLoginWrapper] Finished writing cache`);
  }

  console.log(`[AutoLoginWrapper] Rendering children`);

  return <>{children}</>;
};

export default AutoLoginWrapper;
