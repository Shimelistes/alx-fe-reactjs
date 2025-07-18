import React, { useContext } from 'react';
import UserContext from '../UserContext';

function UserDetails() {

  const userData = useContext(UserContext);

  return (
    <div>
      <p><strong>Name:</strong> {userData.name}</p>
      <p><strong>Email:</strong> {userData.email}</p>

    </div>
  );
}


export default UserDetails;