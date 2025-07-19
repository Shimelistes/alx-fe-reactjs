

import React from 'react';

const UserContext = React.createContext({
  name: "Guest",
  email: "guest@example.com"
});

export default UserContext;