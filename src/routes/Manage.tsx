import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';

export interface Props {
  context: any;
}

const GET_MANAGEABLE_CONTENT = gql`
  query getBookingsByOrg($id: String!) {
    organization(input: { id: $id }) {
      id
      name
      locations {
        id
        name
      }
    }
  }
`;

const Manage = ({ context }: Props) => {
  const { data, loading, error } = useQuery(GET_MANAGEABLE_CONTENT, {
    variables: { id: context.organization.id },
  });
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.log(error);
    return <p>An error occurred while loading the </p>;
  }

  if (!data) {
    return <p>No data</p>;
  }
  return (
    <div>
      <h1>
        Here you can manage your organization and configure your locations
      </h1>

      <h4>Organizations</h4>
      {data.organization && (
        <p>
          {data.organization.name}{' '}
          <Link
            to={{
              pathname: `/app/manage/organizations/${data.organization.id}`,
              state: { organizationId: data.organization.id },
            }}>
            Edit
          </Link>
        </p>
      )}
      <h4>Locations</h4>
      <Link
        to={{
          pathname: '/app/manage/create-location',
          state: { organizationId: data.organization.id },
        }}>
        Add a Location
      </Link>
      {data.organization &&
        data.organization.locations &&
        data.organization.locations.map((location: any) => {
          return (
            <p key={location.id}>
              {location.name}{' '}
              <Link
                to={{
                  pathname: `/app/manage/locations/${location.id}`,
                  state: { locationId: location.id },
                }}>
                Edit
              </Link>
            </p>
          );
        })}
    </div>
  );
};

export default Manage;
