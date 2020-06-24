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
    (async () => {
      try {
        await autoLogin();
      } catch (err) {
        console.log(err);
      }
    })();
  }, [autoLogin]);

  if (!data && !error && !loading) {
    return null;
  }

  if (loading) {
    return null;
  }

  if (error) {
    client.writeData({
      data: {
        isAuthed: false,
      },
    });
  }

  if (data) {
    const { id, email } = data.autoLogin;
    if (id && email) {
      client.writeData({
        data: {
          isAuthed: true,
          user: {
            id,
            email,
            __typename: 'User',
          },
        },
      });
    }
  }

  return <>{children}</>;
};

export default AutoLoginWrapper;
