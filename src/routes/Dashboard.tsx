import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';
import BookingCardSlim from '../components/bookings/BookingCardSlim';

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
          dropoffDate
          pickupDate
          bookingStatus
          updatedDate
          updatedBy
        }
      }
    }
  }
`;

const Dashboard = ({ context }: Props) => {
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

  const bookingsCount = locations
    ? locations.reduce((acc: number, location: any) => {
        return (acc += location.bookings ? location.bookings.length : 0);
      }, 0)
    : 0;

  let bookings: any[] = [];
  locations.forEach((location: any) => {
    location.bookings.forEach((booking: any) => {
      booking.locationId = location.id;
      bookings.push(booking);
    });
  });

  console.log(`bookings: ${JSON.stringify(bookings)}`);

  return (
    <div>
      <h3>This is the dashboard for Organization {context.organization.id}</h3>
      <p>
        There are {bookingsCount} new bookings. Click{' '}
        <Link to="/app/booking-requests">Here</Link> to view them.
      </p>
      <h1>Today</h1>
      <div>
        {bookings.length === 0
          ? 'Nothing to do today 😢'
          : bookings.map((booking: any) => (
              <BookingCardSlim
                key={booking.id}
                id={booking.id}
                locationId={booking.locationId}
                userId={booking.createdBy}
                bookingStatus={booking.bookingStatus}
                dropoffDate={booking.dropoffDate}
                pickupDate={booking.pickupDate}
                updatedBy={booking.updatedBy}
                updatedDate={booking.updatedDate}
              />
            ))}
      </div>
    </div>
  );
};

export default Dashboard;
