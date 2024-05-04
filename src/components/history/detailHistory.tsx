import React, { useEffect, useState } from 'react';
import { Tab } from '@headlessui/react';
import Graph from './graph';
import GraphChart2 from './graph_chart2';
import GraphNivo from './graph_nivo';
import Plotly from './plotly_chart';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { RoleContext } from '../../role_provider';
import JWTProvider from '../../jwt_provider';
import { API_URL } from '../../constant';

interface FormattedData {
    id: number;
    name: string;
    result: string;
    email: string;
    createdAt: string; // Use a more descriptive name
    filePath: string;
  }


const DetailHistory:  React.FC = () => {
    const { role, setRole } = useContext(RoleContext);
    const navigate = useNavigate();
    const jwtProvider = JWTProvider()
    const [detailData, setDetailData] = useState<FormattedData>({});
    const [realChartData, setRealChartData] = useState<any[]>([]);
    const [correctionChartData, setCorrectionChartData] = useState<any[]>([]);
    const { id } = useParams(); 

    useEffect(() => {
        if (jwtProvider.getJwt() === null) {
          navigate('/login');
        }
        if (role === null) {
            jwtProvider.getRole().then((res) => {
                if (res != null) {
                    setRole(res!);
                    if (res === "USER") {
                        navigate('/dashboard/history');
                    }
                } else {
                    navigate('/login');
                }
            })
        };

        const fetchData = async () => {
            try {
              const response = await fetch(API_URL + 'measurements/' + id, {
                headers: {
                  Authorization: `Bearer ${jwtProvider.getJwt()}`, // Include JWT token in authorization header
                },
              });
              
              if (!response.ok) {
                navigate('/dashboard/history');
                throw new Error('Failed to fetch user profile data');
              }
              const data = await response.json();
              console.log(data)
              const filePath = "https://storage.googleapis.com/ta2-storage/20240430073405_1.json";
              const formattedData: FormattedData = {
                id: data.id,
                name: data.user.name,
                result: data.result,
                email: data.user.email,
                createdAt:  new Date(data.config.created_at).toLocaleDateString('id-ID', {
                  timeZone: 'Asia/Jakarta', // WIB timezone
                }),
                filePath: data.analysis
              }

              
              setDetailData(formattedData);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
      
          fetchData();
      }, []);

    return (
        <div className="flex flex-col h-screen">
            <Link to="/dashboard/history" className="absolute top-left inline-flex items-center space-x-2 hover:border-indigo-500 hover:rounded-full border-2 border-transparent p-2 my-10 ml-10">
                    <svg fill="#000000" height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                        viewBox="0 0 476.213 476.213" xml:space="preserve">
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
                        <label className="block text-l font-medium text-gray-700">Nama:</label>
                        <p className="text-l text-gray-900">{detailData.name}</p>
                    </div>
                    <div className='mb-4 flex flex-row'>
                        <label className="block text-l font-medium text-gray-700">Email:</label>
                        <p className="text-l text-gray-900">{detailData.email}</p>
                    </div>
                    <div className='flex flex-row'>
                        <label className="block text-l font-medium text-gray-700">Hasil Analisis:</label>
                        <p className="text-l text-gray-900">{detailData.result &&  detailData.result == "false" ? 'berpotensi RENDAH' : 'berpotensi TINGGI'}</p>
                    </div>
                </>
            </div>
        </div>

        {/* Bottom Half - Tabs */}
        <div className="flex-grow bg-white">
            <Tab.Group>
            <Tab.List className="flex flex-row border-b border-gray-200">
                <Tab className="w-1/4 text-center p-4 text-gray-500 text-base font-normal rounded-lg items-center p-2 group hover:bg-gray-100 focus:bg-indigo-500 focus:text-gray-100">Tab 1</Tab>
                <Tab className="w-1/4 text-center p-4 text-gray-500 text-base font-normal rounded-lg items-center p-2 group hover:bg-gray-100 focus:bg-indigo-500 focus:text-gray-100">Tab 2</Tab>
                <Tab className="w-1/4 text-center p-4 text-gray-500 text-base font-normal rounded-lg items-center p-2 group hover:bg-gray-100 focus:bg-indigo-500 focus:text-gray-100">Tab 3</Tab>
                <Tab className="w-1/4 text-center p-4 text-gray-500 text-base font-normal rounded-lg items-center p-2 group hover:bg-gray-100 focus:bg-indigo-500 focus:text-gray-100">Tab 4</Tab>
            </Tab.List>

            <Tab.Panels>
                <Tab.Panel className="p-20"><Graph filePath={detailData.filePath}/></Tab.Panel>
                <Tab.Panel className="p-20"><GraphChart2 filePath={detailData.filePath} /></Tab.Panel>
                <Tab.Panel className="p-20"><GraphNivo filePath={detailData.filePath} /></Tab.Panel>
                <Tab.Panel className="p-4"><Plotly filePath={detailData.filePath}></Plotly></Tab.Panel>
            </Tab.Panels>
            </Tab.Group>
        </div>
    </div>
  );
};

export default DetailHistory;
