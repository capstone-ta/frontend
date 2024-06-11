import React, { useState, useEffect } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { StatisticsAPI } from '../../api/statistics';

const StatisticsComponent:  React.FC<{ jwt: string }> = ({ jwt }) => {
    const [dataAbove, setDataAbove] = useState<any[]>([]);
    const [dataBelow, setDataBelow] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
        await StatisticsAPI(jwt).then((result: any) => {
            setDataAbove(result.above);
            setDataBelow(result.below);
        });
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-10 bg-white rounded-lg w-10/12 mx-auto p-6">
      <h2 className="text-lg font-semibold mb-4 text-center">Statistik Pengukuran</h2>
      <ScatterChart
          width={730}
          height={250}
          margin={{
              top: 20,
              right: 20,
              bottom: 10,
              left: 10,
          }}
          >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis allowDuplicatedCategory={false} dataKey="x" type="category" name="kategori" unit="" />
          <YAxis dataKey="y" type="number" name="respon arus" unit="µA" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Legend />
          <Scatter name="< 50" data={dataBelow} fill="#82ca9d" />
          <Scatter name="> 50" data={dataAbove} fill="#8884d8" />
      </ScatterChart>
    </div>
  );
};

export default StatisticsComponent;
