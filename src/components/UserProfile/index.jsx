// src/components/UserProfile.js
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../Firebase/ClientApp.mjs';

const UserProfile = () => {
  const [user] = useAuthState(auth);
//   console.log(user.)

  if (!user) {
    return null;
  }

  return (
    <div className="user-profile bg-white rounded-lg shadow-lg p-4 border-double border-4 border-sky-500">
      <h2 className="text-2xl font-bold dark:text-[#1A1A1C]" style={{ fontFamily: 'monospace' }}>User Profile</h2>
      <p className="text-gray-700">Username: {user.username}</p>
      <p className="text-gray-700">Email: {user.email}</p>
    </div>
  );
};

export default UserProfile;
