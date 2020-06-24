import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import config from '../../config';

export interface Props {
  orgId?: string;
}

const GET_ORGANIZATIONS = gql`
  {
    allOrganizations {
      id
      name
    }
  }
`;

const OrganizationPicker = ({ orgId }: Props) => {
  const client = useApolloClient();
  const { loading, data, error } = useQuery(GET_ORGANIZATIONS);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.log(JSON.stringify(error, null, '\t'));
  }

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    localStorage.setItem(config.LS_KEYS.ORG_ID, e.target.value);
    localStorage.removeItem(config.LS_KEYS.LOCATION_ID);
    client.writeData({
      data: {
        context: {
          __typename: 'Context',
          organization: {
            __typename: 'Organization',
            id: e.target.value,
          },
          location: {
            __typename: 'Location',
            id: '',
          },
        },
      },
    });
  };

  const persistedOrg = data.allOrganizations
    ? data.allOrganizations.find((org: any) => org.id === orgId)
    : null;

  return (
    <li>
      <label>Organization</label>
      {data && data.allOrganizations && (
        <select
          onChange={handleSelect}
          defaultValue={persistedOrg ? persistedOrg.id : 'DEFAULT'}>
          <option key={'0'} value={'DEFAULT'} hidden>
            Select
          </option>
          {data.allOrganizations.map((org: any) => (
            <option key={org.id} value={org.id}>
              {org.name}
            </option>
          ))}
        </select>
      )}
    </li>
  );
};

export default OrganizationPicker;
