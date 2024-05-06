import React, { useEffect, useState } from 'react';
import { API_URL } from '../../constant';
import ToastSuccess from '../toast/success';
import ToastWarning from '../toast/warning';

interface TableUserConcifgurationProps {
  jwt: string;
}

interface FormattedData {
  id: string;
  email: string;
  username: string;
  role: string;
}

const UserConfigurationComponent: React.FC<TableUserConcifgurationProps> = ({ jwt }) => {
  const [userData, setUserData] = useState<FormattedData[]>([]);
  const [messageToastWarning, setMessageToastWarning] = useState("");
  const [messageToastSuccess, setMessageToastSuccess] = useState("");

  const fetchData = async () => {
    try {
      let response;
      
      response = await fetch(API_URL + 'users', {
        headers: {
            Authorization: `Bearer ${jwt}`, // Include JWT token in authorization header
        },
      });
      

      if (!response.ok) {
      
        throw new Error('Failed to fetch user profile data');
      }
      const data = await response.json();
      console.log(data)
      const formattedData: FormattedData[] = data.map((obj: any) => ({
        id: obj.id,
        email: obj.email,
        username: obj.name,
        role: obj.role,
      }));

      setUserData(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRoleChange = async (id: string, role: string) => {
    try {
      let response = await fetch(API_URL + 'users/' + id , {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`
        },
        body: JSON.stringify({
            "role": role == "LABORAN" ? "USER" : "LABORAN"
        }),
      });

      if (response.ok) {
        setMessageToastSuccess("Role berhasil diubah");
        fetchData()
      } else {
        setMessageToastWarning("Gagal mengubah role");
      }

    } catch (error) {
      console.error('Error fetching data:', error);
      setMessageToastWarning("Gagal mengubah role");
    }
  }

  return (
    <div className="overflow-x-auto m-10">

      <table className="min-w-full divide-y divide-gray-200">
        {/* Table header */}
        <caption className="text-lg font-medium text-gray-800 mb-4">Daftar Pengguna</caption>
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Username
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ubah Role
            </th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody className="bg-white divide-y divide-gray-200">
          {userData.map((userItem) => 
          (
            <tr key={userItem.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{userItem.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{userItem.username}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{userItem.role}</td>
              {userItem.role && userItem.role != "ADMIN" ? <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button onClick={() => handleRoleChange(userItem.id, userItem.role)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    {userItem.role && userItem.role == "LABORAN" ? 'Ubah ke user biasa' : 'Ubah ke laboran'}
                </button>
                </td> : <></>}
            </tr>
          ))}
        </tbody>
      </table>
      {messageToastWarning != "" && <ToastWarning message={messageToastWarning} />}
      {messageToastSuccess != "" && <ToastSuccess message={messageToastSuccess} />}
    </div>
  );
};

export default UserConfigurationComponent;
