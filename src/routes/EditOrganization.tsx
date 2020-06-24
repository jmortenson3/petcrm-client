import React, { FunctionComponent, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Input from '../components/common/forms/Input';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Label from '../components/common/forms/Label';
import Button from '../components/common/forms/Button';

const GET_ORGANIZATION = gql`
  query getBookingsByOrg($id: String!) {
    organization(input: { id: $id }) {
      id
      name
    }
  }
`;

const UPDATE_ORGANIZATION = gql`
  mutation updateOrganization($id: String!, $name: String!) {
    updateOrganization(input: { id: $id, name: $name }) {
      id
      name
      updatedBy
      updatedDate
    }
  }
`;

const EditOrganization: FunctionComponent = () => {
  const location: any = useLocation();
  const [orgName, setOrgName] = useState('');
  const [orgNameChangeStatus, setOrgNameChangeStatus] = useState('');

  const query = useQuery(GET_ORGANIZATION, {
    variables: { id: location.state.organizationId },
  });

  const [updateOrg, mutation] = useMutation(UPDATE_ORGANIZATION);

  useEffect(() => {
    if (mutation.data) {
      console.log('mutation has data');
      setOrgNameChangeStatus('✔');
    }

    if (mutation.error) {
      console.log('mutation errored');
      setOrgNameChangeStatus('❌');
    }
  }, [mutation]);

  const handleSubmit = async () => {
    console.log('mutation fired');
    await updateOrg({
      variables: { id: location.state.organizationId, name: orgName },
    });

    console.log('mutation finished');

    if (mutation.data) {
      console.log('mutation has data in submit');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrgName(e.target.value);

    if (e.target.value !== query.data.organization.name) {
      setOrgNameChangeStatus('❕');
    } else {
      setOrgNameChangeStatus('');
    }
  };

  if (query.loading) {
    console.log('query loading');
    return <p>Loading...</p>;
  }

  if (query.error) {
    console.log(query.error);
    return <p>Error</p>;
  }

  if (query.data) {
    console.log('query has data');
  }

  if (query.data) {
    return (
      <div>
        <h3>Editing organization {location.state.organizationId}</h3>
        <form>
          <Label htmlFor="organizationName">Organization Name</Label>
          <Input
            name="organizationName"
            defaultValue={query.data.organization.name}
            onChange={handleChange}
          />
          <Button type="button" onClick={handleSubmit}>
            Update {orgNameChangeStatus}
          </Button>
        </form>
      </div>
    );
  } else {
    return <p>Nothing</p>;
  }
};

export default EditOrganization;
