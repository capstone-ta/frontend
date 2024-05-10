import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HistoryAPI, HistoryUserAPI } from '../../api/history';
import HistoryDataInterface from '../../types/history';


const TableHistory: React.FC<{ jwt: string; uuid: string; role: string }> = ({ jwt, uuid, role }) => {
  const [historyData, setHistoryData] = useState<HistoryDataInterface[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (role === "USER") {
          response = await HistoryUserAPI(jwt, uuid);
        } else {
          response = await HistoryAPI(jwt); 
        }


        const formattedData: HistoryDataInterface[] = response.map((obj: any) => ({
          id: obj.id,
          name: obj.user.name,
          result: obj.result,
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
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{historyItem.result && historyItem.result == "false" ? 'berpotensi RENDAH' : 'berpotensi TINGGI'}</td>
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
