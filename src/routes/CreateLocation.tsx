import React, { FunctionComponent, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Input from '../components/common/forms/Input';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Label from '../components/common/forms/Label';
import Button from '../components/common/forms/Button';

const CREATE_LOCATION = gql`
  mutation createLocation($organizationId: String!, $name: String!) {
    createLocation(input: { organizationId: $organizationId, name: $name }) {
      id
      name
    }
  }
`;

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

const CreateLocation: FunctionComponent = () => {
  const location: any = useLocation();
  const [locationName, setLocationName] = useState('');
  const [createLocation, mutation] = useMutation(CREATE_LOCATION, {
    update(cache, { data: { createLocation } }) {
      const data: any = cache.readQuery({
        query: GET_LOCATIONS,
        variables: { id: location.state.organizationId },
      });
      data.organization.locations.push(createLocation);
      cache.writeQuery({
        query: GET_LOCATIONS,
        variables: { id: location.state.organizationId },
        data,
      });
    },
  });

  useEffect(() => {
    if (mutation.data) {
      console.log('mutation has data');
    }

    if (mutation.error) {
      console.log('mutation errored');
    }
  }, [mutation]);

  const handleSubmit = async () => {
    console.log('mutation fired');
    await createLocation({
      variables: {
        organizationId: location.state.organizationId,
        name: locationName,
      },
    });

    console.log('mutation finished');

    if (mutation.data) {
      console.log('mutation has data in submit');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocationName(e.target.value);
  };

  return (
    <div>
      <h3>New Location for Organization {location.state.organizationId}</h3>
      <form>
        <Label htmlFor="locationName">Location Name</Label>
        <Input
          name="locationName"
          placeholder="Enter the location name"
          onChange={handleChange}
        />
        <Button type="button" onClick={handleSubmit}>
          Create
        </Button>
      </form>
    </div>
  );
};

export default CreateLocation;
