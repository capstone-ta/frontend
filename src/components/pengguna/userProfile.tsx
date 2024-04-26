import React, { useState, useEffect } from 'react';
import { API_URL } from '../../constant';

interface UserProfileProps {
  jwt: string;
  uuid: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ jwt, uuid }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch user profile data
  const fetchUserProfile = async () => {
    setIsLoading(true);
    setError(null); // Clear previous error

    try {
      const response = await fetch(API_URL + 'users/' + uuid, {
        headers: {
          Authorization: `Bearer ${jwt}`, // Include JWT token in authorization header
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user profile data');
      }

      const data = await response.json();
      setName(data.name);
      setEmail(data.email);
    } catch (error) {
     
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
      <div className="bg-white rounded-lg shadow-lg p-6 w-9/12 h-9/12">
        <h2 className="text-lg font-semibold mb-4 text-center">Profil Pengguna</h2>
        {isLoading && <p>Memuat data...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!isLoading && !error && ( // Display profile data only if no errors or loading
          <>
            <div className="mb-4">
              <label className="block text-l font-medium text-gray-700">Nama:</label>
              <p className="text-l text-gray-900">{name}</p>
            </div>
            <div>
              <label className="block text-l font-medium text-gray-700">Email:</label>
              <p className="text-l text-gray-900">{email}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
