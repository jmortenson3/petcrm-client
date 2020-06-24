import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import config from '../../config';

export interface Props {
  organizationId: string;
  locationId?: string;
}

const GET_LOCATIONS = gql`
  query GetLocationsByOrganizationId($id: String!) {
    organization(input: { id: $id }) {
      locations {
        id
        name
      }
    }
  }
`;

const LocationPicker = ({ organizationId, locationId }: Props) => {
  const client = useApolloClient();
  const { loading, data, error } = useQuery(GET_LOCATIONS, {
    variables: { id: organizationId },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.log(JSON.stringify(error, null, '\t'));
  }

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    localStorage.setItem(config.LS_KEYS.LOCATION_ID, e.target.value);
    client.writeData({
      data: {
        context: {
          __typename: 'Context',
          location: {
            __typename: 'Location',
            id: e.target.value,
          },
        },
      },
    });
  };

  if (data) {
    const persistedLocation =
      data.organization && data.organization.locations
        ? data.organization.locations.find(
            (location: any) => location.id === locationId
          )
        : null;

    return (
      <li>
        <label>Location</label>
        {data && data.organization && data.organization.locations && (
          <select
            onChange={handleSelect}
            defaultValue={persistedLocation ? persistedLocation.id : 'DEFAULT'}>
            <option key={'0'} value={'DEFAULT'} hidden>
              Select
            </option>
            {data.organization.locations.map((location: any) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        )}
      </li>
    );
  } else {
    return <p>No data</p>;
  }
};

export default LocationPicker;
