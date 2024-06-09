import React, { useState, useEffect } from 'react';
import { UserProfileAPI } from '../../api/userProfile';
import UserProfileInterface from '../../types/userProfile';

const UserProfile: React.FC<UserProfileInterface> = ({ jwt, uuid }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserProfile = async () => {
    setIsLoading(true);
    setError(null); 

    try {
      const data = await UserProfileAPI(jwt, uuid);
      setName(data.name);
      setEmail(data.email);
    } catch (error) {
      setError('Gagal memuat data profil pengguna');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchUserProfile();
  }, [jwt]); // Dependency array: fetch only when jwt changes

  return (
    <div className="flex items-center justify-center mt-10">
      <div className="bg-white rounded-lg p-6 w-9/12 h-9/12">
        <h2 className="text-lg font-semibold mb-4 text-center">Profil Pengguna</h2>
        {isLoading && <p>Memuat data...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!isLoading && !error && ( 
          <>
            <div className="mb-4">
              <label className="block text-l font-medium text-black-500">Nama:</label>
              <p className="text-l text-gray-500">{name}</p>
            </div>
            <div>
              <label className="block text-l font-medium text-black-500">Email:</label>
              <p className="text-l text-gray-500">{email}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
