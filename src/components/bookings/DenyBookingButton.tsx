import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

export interface Props {
  id: string;
}

const DENY_BOOKING = gql`
  mutation denyBooking($id: String!, $deniedNotes: String!) {
    denyBooking(input: { id: $id, deniedNotes: $deniedNotes }) {
      id
      bookingStatus
      updatedBy
      updatedDate
    }
  }
`;

const Button = styled.button``;

const DenyBookingButton: FunctionComponent<Props> = ({ children, id }) => {
  const [denyBooking, { data, error }] = useMutation(DENY_BOOKING);

  if (error) {
    console.log(error);
    return <p>{error}</p>;
  }
  if (data) {
    console.log(JSON.stringify(data));
  }

  const handleClick = async () => {
    try {
      console.log('denying the booking...');
      await denyBooking({
        variables: { id, deniedNotes: 'placeholder' },
      });
      console.log('Booking denied.');
    } catch (err) {
      console.log(err);
    }
  };

  return <Button onClick={handleClick}>{children}</Button>;
};

export default DenyBookingButton;
