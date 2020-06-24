import React, { FunctionComponent } from 'react';
import { useLocation } from 'react-router-dom';

const EditLocation: FunctionComponent = () => {
  const location: any = useLocation();
  return <p>Editing location {location.state.locationId}</p>;
};

export default EditLocation;
