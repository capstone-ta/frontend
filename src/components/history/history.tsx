import React, { useEffect, useState } from 'react';

const exampleHistoryData: HistoryData[] = [
    {
      id: 1,
      date: "2024-04-23",
      username: "john_doe",
      testResult: "Pass",
      link: "https://example.com/history/1"
    },
    {
      id: 2,
      date: "2024-04-22",
      username: "jane_smith",
      testResult: "Fail",
      link: "https://example.com/history/2"
    },
    // tambahkan data lain di sini jika diperlukan
  ];
  

interface HistoryData {
  id: number;
  date: string;
  username: string;
  testResult: string;
  link: string;
}


const TableHistory: React.FC = () => {
  const [historyData, setHistoryData] = useState<HistoryData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //const response = await fetch(historyUrl);
        //const data = await response.json();
        setHistoryData(exampleHistoryData);
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
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Link
            </th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody className="bg-white divide-y divide-gray-200">
          {historyData.map((historyItem) => (
            <tr key={historyItem.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{historyItem.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{historyItem.date}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{historyItem.username}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{historyItem.testResult}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <a href={historyItem.link} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                  View
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableHistory;
