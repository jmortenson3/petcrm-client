import React, { FunctionComponent } from 'react';
import NavBar from './NavBar';

const Layout: FunctionComponent = ({ children }) => (
  <div>
    <NavBar />
    {children}
  </div>
);

export default Layout;
