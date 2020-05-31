import React from 'react';
import { Switch, Route, Redirect, RouteProps } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import App from './App';

export const IS_AUTHED = gql`
  query IsAuthed {
    isAuthed @client
  }
`;

interface ProtectedRouteProps extends RouteProps {}

const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {
  const { loading, error, data } = useQuery(IS_AUTHED);
  if (error) {
    console.log(`[ProtectedRoute] IS_AUTHED failed`);
    console.log(error);
    return <Redirect to="/login" />;
  }

  if (data && data.isAuthed === undefined) {
    // don't know yet
    console.log('[ProtectedRoute] IS_AUTHED is not sure yet...');
    return <></>;
  }

  if (data && data.isAuthed) {
    return <Route {...props} />;
  } else {
    console.log(`[ProtectedRoute] data: ${JSON.stringify(data)}`);
    return (
      <Redirect
        to={{ pathname: '/login', state: { isAuthed: data.isAuthed } }}
      />
    );
  }
};

console.log(`[ProtectedRoute] rendering`);
const Router = () => {
  const { loading, error, data } = useQuery(IS_AUTHED);
  if (loading) {
    return null;
  }
  if (data) {
    return (
      <Switch>
        <Redirect exact from="/" to="/app" />
        <ProtectedRoute path="/app" component={App} />
        <ProtectedRoute path="/anotherRoute" />
        <Route
          path="/login"
          render={() => <Login isAuthed={data.isAuthed} />}
        />
        <Route
          path="/signup"
          render={() => <Signup isAuthed={data.isAuthed} />}
        />
      </Switch>
    );
  }
  return null;
};

export default Router;
