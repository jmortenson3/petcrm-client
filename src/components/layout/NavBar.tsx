import React, { FunctionComponent } from 'react';
import { Link, withRouter } from 'react-router-dom';

const NavBar: FunctionComponent = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/app">App</Link>
        </li>
        <li>
          <Link to="/anotherRoute">Another Router</Link>
        </li>
      </ul>
    </nav>
  );
};

export default withRouter(NavBar);
