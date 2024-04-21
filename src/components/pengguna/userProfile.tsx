import React from 'react';

interface UserProfileProps {
  name: string;
  phoneNumber: string;
  email: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ name, phoneNumber, email }) => {
  return (
    <div className="flex items-center justify-center mt-10">
      <div className="bg-white rounded-lg shadow-lg p-6 w-9/12 h-9/12">
        <h2 className="text-lg font-semibold mb-4 text-center">Profil Pengguna</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Nama:</label>
          <p className="text-sm text-gray-900">{name}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Nomor HP:</label>
          <p className="text-sm text-gray-900">{phoneNumber}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email:</label>
          <p className="text-sm text-gray-900">{email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
