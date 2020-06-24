import React from 'react';
import styled from 'styled-components';

export interface Props {
  id: string;
  locationId: string;
  pickupDate: string;
  dropoffDate: string;
  userId: string;
  bookingStatus: string;
  updatedDate: string;
  updatedBy: string;
}

const CardWrapper = styled.div`
  box-shadow: 1px 3px 9px #333;
  padding: 8px 15px;
`;

const BookingCardSlim = ({
  id,
  locationId,
  pickupDate,
  dropoffDate,
  userId,
  bookingStatus,
  updatedDate,
  updatedBy,
}: Props) => {
  return (
    <CardWrapper>
      <h4>Booking request from {userId}</h4>
      <p>Booking id: {id}</p>
      <p>At location: {locationId}</p>
      <p>Dropoff: {dropoffDate}</p>
      <p>Pickup: {pickupDate}</p>
      <p>Status: {bookingStatus}</p>
      <p>
        Last updated by {updatedBy} on {updatedDate}
      </p>
    </CardWrapper>
  );
};

export default BookingCardSlim;
