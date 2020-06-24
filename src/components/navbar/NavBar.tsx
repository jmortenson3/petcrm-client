import React from 'react';
import { Link } from 'react-router-dom';
import OrganizationPicker from './OrganizationPicker';
import LocationPicker from './LocationPicker';

export interface Props {
  context: any;
}

const NavBar = ({ context }: Props) => {
  const clearLocalStorage = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <nav>
      <ul>
        <li>
          <button onClick={clearLocalStorage}>Clear localStorage</button>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/app">App</Link>
        </li>
        <li>
          <Link to="/app/manage">⚙ Manage</Link>
        </li>
        <OrganizationPicker orgId={context.organization.id} />
        {context && context.organization.id && (
          <LocationPicker
            organizationId={context.organization.id}
            locationId={context.location.id}
          />
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
