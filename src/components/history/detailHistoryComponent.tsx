import React, { useEffect, useState } from 'react';
import { Tab } from '@headlessui/react';
import Graph from './graph';
import GraphChart2 from './graph_chart2';
import GraphNivo from './graph_nivo';
import Plotly from './plotly_chart';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AuthProvider from '../../utils/authProvider';
import DetailHistoryDataInterface from '../../types/detailHistory';
import { DetailHistoryAPI } from '../../api/detailHistory';


const DetailHistoryComponent:  React.FC = () => {
    const navigate = useNavigate();
    const authProvider = AuthProvider()
    const [detailData, setDetailData] = useState<DetailHistoryDataInterface | null>(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams(); 

    useEffect(() => {
        setLoading(true);
      authProvider.checkCredential().then((role) => {
          if (role === null) {
              navigate('/login');
          }
          if (role === "USER") {
            navigate('/dashboard/history');
          }
      })

        const fetchData = async () => {
            try {
              if (id === undefined) navigate('/dashboard/');
              const response = await DetailHistoryAPI(authProvider.getJwt()!, id!);
              
              if (response === null) {
                navigate('/dashboard/');
              }
              setDetailData(response);
            } catch (error) {
              console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
          };
          fetchData();
      }, []);

      if (loading) {
        return <div></div>;
      }

    return (
        <div className="flex flex-col h-screen">
            <Link to="/dashboard/" className="absolute text-gray-500 top-left inline-flex items-center space-x-2 hover:border-indigo-500 hover:text-indigo-500 hover:rounded-full border-2 border-transparent p-2 my-10 ml-10">
                    <svg fill="#000000" height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 476.213 476.213">
                    <polygon points="476.213,223.107 57.427,223.107 151.82,128.713 130.607,107.5 0,238.106 130.607,368.714 151.82,347.5 
                        57.427,253.107 476.213,253.107 "/>
                    </svg>
                <span>Back</span>
            </Link>
        <div className="flex items-center justify-center my-10 w-full">
            <div className="bg-white rounded-lg shadow-lg p-6 w-8/12 h-9/12">
                <h2 className="text-lg font-semibold mb-4 text-center">Detail Grafik</h2>
                <>
                    <div className="mb-4 flex flex-row">
                        <label className="block text-l font-medium text-black-500">Nama:</label>
                        <p className="text-l text-gray-500 ml-2">{detailData?.name ? detailData.name : "TEMP"}</p>
                    </div>
                    <div className='mb-4 flex flex-row'>
                        <label className="block text-l font-medium text-black-500">Deskripsi:</label>
                        <p className="text-l text-gray-500 ml-2">{detailData?.desc ? detailData.desc : ""}</p>
                    </div>
                    <div className='mb-4 flex flex-row'>
                        <label className="block text-l font-medium text-black-500">Metode:</label>
                        <p className="text-l text-gray-500 ml-2">{detailData?.method ? detailData.method : ""}</p>
                    </div>
                    {detailData ? 
                    <div className='flex flex-row'>
                        <label className="block text-l font-medium text-black-500">Hasil Analisis:</label>
                        <p className="text-l text-gray-500 ml-2">{detailData && detailData!.result &&  detailData!.result == "false" ? 'berpotensi RENDAH' : 'berpotensi TINGGI'}</p>
                    </div> : <> </>  
                }
                </>
            </div>
        </div>

        {/* Bottom Half - Tabs */}
        <div className="flex-grow bg-indigo-100">
            <Tab.Group>
                <Tab.Panels>
                    <Tab.Panel className="p-4 flex justify-center"><Graph filePath1={detailData ?  detailData!.filePath1 : ""} filePath2={detailData ?  detailData!.filePath2 : ""}/></Tab.Panel>
                    <Tab.Panel className="p-4 flex justify-center" style={{height: '375px'}}><GraphChart2 filePath1={detailData ?  detailData!.filePath1 : ""} filePath2={detailData ?  detailData!.filePath2 : ""} /></Tab.Panel>
                    <Tab.Panel className="p-4 flex justify-center" style={{height: '375px'}}><GraphNivo filePath1={detailData ?  detailData!.filePath1 : ""} filePath2={detailData ?  detailData!.filePath2 : ""} /></Tab.Panel>
                    <Tab.Panel className="p-4 flex justify-center"><Plotly filePath1={detailData ?  detailData!.filePath1 : ""} filePath2={detailData ?  detailData!.filePath2 : ""}></Plotly></Tab.Panel>
                </Tab.Panels>
                <Tab.List className="flex flex-row border-b border-gray-200 mb-20">
                    <Tab className="w-1/4 text-center p-4 text-indigo-500 text-base font-normal items-center p-2 group hover:bg-indigo-500 hover:text-indigo-100 focus:bg-indigo-500 focus:text-gray-100">Rechart</Tab>
                    <Tab className="w-1/4 text-center p-4 text-indigo-500 text-base font-normal items-center p-2 group hover:bg-indigo-500 hover:text-indigo-100 focus:bg-indigo-500 focus:text-gray-100">React Chart Js</Tab>
                    <Tab className="w-1/4 text-center p-4 text-indigo-500 text-base font-normal items-center p-2 group hover:bg-indigo-500 hover:text-indigo-100 focus:bg-indigo-500 focus:text-gray-100">Nivo</Tab>
                    <Tab className="w-1/4 text-center p-4 text-indigo-500 text-base font-normal items-center p-2 group hover:bg-indigo-500 hover:text-indigo-100 focus:bg-indigo-500 focus:text-gray-100">Plotly</Tab>
                </Tab.List>
            </Tab.Group>
        </div>
    </div>
  );
};

export default DetailHistoryComponent;
