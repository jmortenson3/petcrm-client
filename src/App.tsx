import React, { useEffect } from 'react';
import { gql, InMemoryCache } from 'apollo-boost';
import Router from './routes/Router';
import Layout from './components/layout/Layout';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Redirect } from 'react-router-dom';

const AUTO_LOGIN = gql`
  mutation autoLogin {
    autoLogin {
      id
      email
    }
  }
`;

const cache = new InMemoryCache();

cache.writeData({
  data: {
    isAuthed: false,
    user: {},
  },
});

const App = () => {
  const [autoLogin, { error, loading, data }] = useMutation(AUTO_LOGIN);

  useEffect(() => {
    (async () => {
      try {
        await autoLogin();
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  if (error) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="App">
      <Layout>
        {loading && <p>Logging you in...</p>}
        {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
        {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      </Layout>
    </div>
  );
};

export default App;
