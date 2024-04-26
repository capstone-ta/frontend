import React, { useEffect, useState } from 'react';
import { API_URL } from '../../constant';
import { Link } from 'react-router-dom';

  const datum = [
    {
      "id": 0,
      "name": "string",
      "description": "string",
      "filepath": "string",
      "analysis": "string",
      "result": true,
      "config_id": 0,
      "user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "config": {
        "id": 0,
        "created_at": "2024-04-26T14:37:59.451Z",
        "updated_at": "2024-04-26T14:37:59.451Z",
        "method": "string",
        "description": "string"
      },
      "user": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "name": "string",
        "email": "user@example.com",
        "access_token": "string",
        "token_type": "string",
        "role": "string"
      },
      "created_at": "2024-04-26T14:37:59.451Z",
      "updated_at": "2024-04-26T14:37:59.451Z"
    },
    {
      "id": 0,
      "name": "string",
      "description": "string",
      "filepath": "string",
      "analysis": "string",
      "result": true,
      "config_id": 0,
      "user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "config": {
        "id": 0,
        "created_at": "2024-04-26T14:37:59.451Z",
        "updated_at": "2024-04-26T14:37:59.451Z",
        "method": "string",
        "description": "string"
      },
      "user": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "name": "string",
        "email": "user@example.com",
        "access_token": "string",
        "token_type": "string",
        "role": "string"
      },
      "created_at": "2024-04-26T14:37:59.451Z",
      "updated_at": "2024-04-26T14:37:59.451Z"
    },
    {
      "id": 0,
      "name": "string",
      "description": "string",
      "filepath": "string",
      "analysis": "string",
      "result": true,
      "config_id": 0,
      "user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "config": {
        "id": 0,
        "created_at": "2024-04-26T14:37:59.451Z",
        "updated_at": "2024-04-26T14:37:59.451Z",
        "method": "string",
        "description": "string"
      },
      "user": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "name": "string",
        "email": "user@example.com",
        "access_token": "string",
        "token_type": "string",
        "role": "string"
      },
      "created_at": "2024-04-26T14:37:59.451Z",
      "updated_at": "2024-04-26T14:37:59.451Z"
    }
  ]


interface TableHistoryProps {
  jwt: string;
  uuid: string;
  role: string;
}

interface FormattedData {
  id: number;
  name: string;
  analysis: string;
  createdAt: string; // Use a more descriptive name
}

const TableHistory: React.FC<TableHistoryProps> = ({ jwt, uuid, role }) => {
  const [historyData, setHistoryData] = useState<FormattedData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL + 'measurements/user/' + uuid, {
          headers: {
            Authorization: `Bearer ${jwt}`, // Include JWT token in authorization header
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch user profile data');
        }
        const data = await response.json();
        
        const formattedData: FormattedData[] = datum.map((obj) => ({
          id: obj.id,
          name: obj.user.name,
          analysis: obj.analysis,
          createdAt:  new Date(obj.config.created_at).toLocaleDateString('id-ID', {
            timeZone: 'Asia/Jakarta', // WIB timezone
          })
        }));

        setHistoryData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="overflow-x-auto m-10">

      <table className="min-w-full divide-y divide-gray-200">
        {/* Table header */}
        <caption className="text-lg font-medium text-gray-800 mb-4">Riwayat Pengujian</caption>
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Username
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Test Result
            </th>
            {role && role != "USER" && (
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Link
              </th>
            )}
          </tr>
        </thead>
        {/* Table body */}
        <tbody className="bg-white divide-y divide-gray-200">
          {historyData.map((historyItem) => 
          (
            <tr key={historyItem.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{historyItem.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{historyItem.createdAt}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{historyItem.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{historyItem.analysis}</td>
              {role && role != "USER" && (
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Link to={"/dashboard/history/" + historyItem.id} className="text-blue-500 hover:underline">
                    View
                  </Link>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableHistory;
