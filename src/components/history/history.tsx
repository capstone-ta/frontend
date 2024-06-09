import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HistoryAPI, HistoryUserAPI, HistoryDeleteAPI } from '../../api/history';
import HistoryDataInterface from '../../types/history';


const TableHistory: React.FC<{ jwt: string; uuid: string; role: string }> = ({ jwt, uuid, role }) => {
  const [historyData, setHistoryData] = useState<HistoryDataInterface[]>([]);
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
        method: obj.config.method,
        createdAt:  new Date(obj.config.created_at).toLocaleDateString('id-ID', {
          timeZone: 'Asia/Jakarta', // WIB timezone
        })
      }));

      setHistoryData(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    

    fetchData();
  }, []);

  const handleDeleteData = async (id: number) => {
    try {
      await HistoryDeleteAPI(jwt, id.toString());
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  }

  return (
    <div className="overflow-x-auto m-10 bg-white rounded-lg p-5">
        <table className="min-w-full divide-y divide-gray-200">
        {/* Table header */}
        <caption className="text-lg font-medium text-black-500 mb-4">Riwayat Pengujian</caption>
        <thead className="bg-white">
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
              Jenis Pengukuran
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Hasil Tes
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Hapus Data
            </th>
            {role && role != "USER" && (
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Lihat Detail Data
              </th>
            )}
          </tr>
        </thead>
        {/* Table body */}
        <tbody className="bg-white divide-y divide-gray-200">
          {historyData.map((historyItem) => 
          (
            <tr key={historyItem.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-black-500">{historyItem.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-black-500">{historyItem.createdAt}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-black-500">{historyItem.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-black-500">{historyItem.method}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-black-500">{historyItem.method === "CV" ? "Tidak ada" : ""}{historyItem.result && historyItem.result == "false" ? 'Berpotensi RENDAH' : 'Berpotensi TINGGI'}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-black-500">
                <button onClick={() => handleDeleteData(historyItem.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                  Hapus
                </button>
              </td>
              {role && role != "USER" && (
                <td className="px-6 py-4 whitespace-nowrap text-sm text-black-500">
                  <Link to={"/dashboard/history/" + historyItem.id} className="">
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
                      Lihat Detail
                    </button>
                  </Link>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {historyData.length === 0 && (
            <h1 className="text-base text-center font-medium text-gray-500 mb-4">Tidak ada data yang ditemukan</h1>
        )}
    </div>
  );
};

export default TableHistory;
