import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import BookingCard from '../components/bookings/BookingCard';

export interface Props {
  context: any;
}

const GET_BOOKINGS_BY_ORG = gql`
  query getBookingsByOrg($id: String!) {
    organization(input: { id: $id }) {
      locations {
        id
        name
        bookings {
          id
          pickupDate
          dropoffDate
          bookingStatus
          createdDate
          createdBy
          updatedDate
          updatedBy
        }
      }
    }
  }
`;

const BookingRequests = ({ context }: Props) => {
  const { data, loading, error } = useQuery(GET_BOOKINGS_BY_ORG, {
    variables: {
      id: context.organization.id,
    },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.log(error);
    return <p>Something went wrong! ☹ Try refreshing your browser.</p>;
  }

  const locations = context.location.id
    ? data.organization.locations.filter(
        (location: any) => location.id === context.location.id
      )
    : data.organization.locations;

  return (
    <div>
      <h3>
        These are booking requests for Organization {context.organization.id}
      </h3>
      {locations &&
        locations.map((location: any) => {
          return location.bookings.map((booking: any) => {
            return (
              <BookingCard
                key={booking.id}
                id={booking.id}
                locationId={location.id}
                userId={booking.createdBy}
                pickupDate={booking.pickupDate}
                dropoffDate={booking.dropoffDate}
                bookingStatus={booking.bookingStatus}
                requestedDate={booking.createdDate}
                updatedDate={booking.updatedDate}
                updatedBy={booking.updatedBy}
              />
            );
          });
        })}
    </div>
  );
};

export default BookingRequests;
