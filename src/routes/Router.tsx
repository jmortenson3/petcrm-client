import React from 'react';
import { Switch, Route, Redirect, RouteProps } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import App from '../App';

export const IS_AUTHED = gql`
  query IsAuthed {
    isAuthed @client
  }
`;

interface ProtectedRouteProps extends RouteProps {}

const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {
  const { loading, error, data } = useQuery(IS_AUTHED);
  if (error) {
    console.log(`IS_AUTHED failed`);
    console.log(error);
    return <Redirect to="/login" />;
  }

  if (data.isAuthed) {
    return <Route {...props} />;
  } else {
    console.log(`IS_AUTHED succeeded but not authed`);
    console.log(JSON.stringify(data));
    return <Redirect to="/login" />;
  }
};

const Router = () => (
  <Switch>
    <Redirect exact from="/" to="/app" />
    {/* <Route path="/app" component={App}/> */}
    <ProtectedRoute path="/app" component={App} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
  </Switch>
);

export default Router;
