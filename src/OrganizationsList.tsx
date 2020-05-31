import React, { FunctionComponent } from 'react';
import { gql } from 'apollo-boost';
import { useLazyQuery } from '@apollo/react-hooks';

const GET_ORGANIZATIONS = gql`
  {
    allOrganizations {
      id
      name
    }
  }
`;

const OrganizationsList: FunctionComponent = () => {
  const [getOrganizations, { loading, data, error }] = useLazyQuery(
    GET_ORGANIZATIONS
  );

  if (loading) {
    console.log('its loading');
    return <p>Loading...</p>;
  }

  if (error) {
    console.log(JSON.stringify(error, null, '\t'));
  }

  if (data) {
    console.log('now it has data: ' + JSON.stringify(data));
  }

  return (
    <div>
      <button onClick={() => getOrganizations()}>Get the organizations</button>
      <ul>
        {data &&
          data.allOrganizations.map((org: any) => (
            <li key={org.id}>{org.name}</li>
          ))}
      </ul>
    </div>
  );
};

export default OrganizationsList;
