import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

export interface Props {
  id: string;
}

const ACCEPT_BOOKING = gql`
  mutation acceptBooking($id: String!) {
    acceptBooking(input: { id: $id }) {
      id
      bookingStatus
      updatedBy
      updatedDate
    }
  }
`;

const Button = styled.button``;

const AcceptBookingButton: FunctionComponent<Props> = ({ id, children }) => {
  const [acceptBooking, { data, error }] = useMutation(ACCEPT_BOOKING);

  if (error) {
    console.log(error);
    return <p>{error}</p>;
  }

  if (data) {
    console.log(JSON.stringify(data));
  }

  const handleClick = async () => {
    try {
      console.log('accepting the booking...');
      await acceptBooking({ variables: { id } });
      console.log('booking accepted');
    } catch (err) {
      console.log(err);
    }
  };

  return <Button onClick={handleClick}>{children}</Button>;
};

export default AcceptBookingButton;
