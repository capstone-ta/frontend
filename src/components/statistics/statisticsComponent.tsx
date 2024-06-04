import React, { useState, useEffect } from 'react';
import { ScatterChart, Scatter, ZAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { StatisticsAPI } from '../../api/statistics';

const StatisticsComponent:  React.FC<{ jwt: string }> = ({ jwt }) => {
    const [dataAbove, setDataAbove] = useState<any[]>([]);
    const [dataBelow, setDataBelow] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
        await StatisticsAPI(jwt).then((result: any) => {
            console.log(result)
            setDataAbove(result.above);
            setDataBelow(result.below);
        });
    }
    fetchData();
  }, []);

  return (
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
        <YAxis dataKey="y" type="number" name="respon arus" unit="mA" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Legend />
        <Scatter name="Below Treshold" data={dataBelow} fill="#82ca9d" />
        <Scatter name="Above Treshold" data={dataAbove} fill="#8884d8" />
    </ScatterChart>
  );
};

export default StatisticsComponent;
