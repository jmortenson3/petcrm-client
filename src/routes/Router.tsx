import React from 'react';
import { Switch, Route, Redirect, RouteProps } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import App from './App';
import BookingRequests from './BookingRequests';
import Dashboard from './Dashboard';
import Manage from './Manage';
import EditLocation from './EditLocation';
import EditOrganization from './EditOrganization';
import CreateLocation from './CreateLocation';

const GET_CONTEXT = gql`
  query getContext {
    isAuthed @client
    context @client {
      __typename
      organization {
        id
        __typename
      }
      location {
        id
        __typename
      }
    }
  }
`;

interface ProtectedRouteProps extends RouteProps {}

const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {
  const { loading, error, data } = useQuery(GET_CONTEXT);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.log(error);
    return <Redirect to="/login" />;
  }

  if (data && data.isAuthed === undefined) {
    // don't know yet
    return <></>;
  }

  if (data && data.isAuthed) {
    return <Route {...props} />;
  } else {
    return (
      <Redirect
        to={{ pathname: '/login', state: { isAuthed: data.isAuthed } }}
      />
    );
  }
};

const Router = () => {
  const { loading, error, data } = useQuery(GET_CONTEXT);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.log(error);
  }

  if (data) {
    return (
      <Switch>
        <Redirect exact from="/" to="/app" />
        <ProtectedRoute
          path="/app"
          render={() => (
            <App>
              <ProtectedRoute
                exact
                path="/app"
                render={() => <Dashboard context={data.context} />}
              />
              <ProtectedRoute
                exact
                path="/app/booking-requests"
                render={() => <BookingRequests context={data.context} />}
              />
              <ProtectedRoute
                exact
                path="/app/manage"
                render={() => <Manage context={data.context} />}
              />
              <ProtectedRoute
                exact
                path="/app/manage/locations/:id"
                component={EditLocation}
              />
              <ProtectedRoute
                exact
                path="/app/manage/organizations/:id"
                component={EditOrganization}
              />
              <ProtectedRoute
                exact
                path="/app/manage/create-location"
                component={CreateLocation}
              />
            </App>
          )}
        />
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
