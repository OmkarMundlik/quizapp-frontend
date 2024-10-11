import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const UserProtectedRoute = ({ Component }) => {
  const token = Cookies.get('jwtoken'); // Get the token from cookies

  // Check if the token exists. If not, redirect to the login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Render the passed-in component if authenticated
  return <Component />;
};

export default UserProtectedRoute;
