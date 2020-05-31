import React, { FunctionComponent } from 'react';
import { Link, withRouter } from 'react-router-dom';

const NavBar: FunctionComponent = () => {
  return (
    <nav>
      <ul>
        <Link to="/">Home</Link>
        <Link to="/app">App</Link>
      </ul>
    </nav>
  );
};

export default withRouter(NavBar);
