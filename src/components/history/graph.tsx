import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';
import { RechartChartAPI } from '../../api/rechartChart';
import ChartDataPoint from '../../types/chart';

const Graph: React.FC<{filePath: string}> = ({ filePath }) => {
  const [dataPengukuranAsli, setDataPengukuranAsli] = useState<ChartDataPoint[]>([]);
  const [dataBaseline1, setDataBaseline1] = useState<ChartDataPoint[]>([]);
  const [dataBaseline2, setDataBaseline2] = useState<ChartDataPoint[]>([]);
  const [dataPuncak1, setDataPuncak1] = useState<ChartDataPoint[]>([]);
  const [dataPuncak2, setDataPuncak2] = useState<ChartDataPoint[]>([]);
  const [isCV, setIsCV] = useState<Boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      await RechartChartAPI(filePath).then((result: any) => {
        setDataPengukuranAsli(result[0]);
        setDataBaseline1(result[1]);
        setDataBaseline2(result[2]);
        setDataPuncak1(result[3]);
        setDataPuncak2(result[4]);
        setIsCV(result[5]);
      });
    } 


    fetchData();
  }, []);

  return (
    <LineChart
      width={1000}
      height={600}
      //margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
      margin={{top: 5, right: 30, left: 20, bottom: 5}}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis label={{ value: 'V', position: 'insideBottom', offset: -5 }} type="number" dataKey="x" domain={['dataMin', 'dataMax']}/>
      <YAxis label={{ value: 'µA', angle: -90, position: 'insideLeft' }} />
      <Tooltip />
      <Legend verticalAlign="top" align="right" />
      <Line name="pengukuran" data={dataPengukuranAsli} type="monotone" dataKey="y" stroke="#8884d8" activeDot={{r: 4}} dot={false}/>
      <Line name={isCV ? "baseline correction - oksidasi" : "baseline correction"} data={dataBaseline1} dot={false} type="monotone" dataKey="y" stroke="#a83232" activeDot={{r: 4}} />
      {isCV ? <Line name="baseline correction - reduksi" data={dataBaseline2} dot={false} type="monotone" dataKey="y" stroke="#a83232" activeDot={{r: 4}} /> : null}
      <ReferenceLine label={isCV ? "puncak - oksidasi" : "puncak"} stroke="green" strokeDasharray="3 3" segment={dataPuncak1} />
      {isCV ? <ReferenceLine label="puncak - reduksi" stroke="green" strokeDasharray="3 3" segment={dataPuncak2} /> : null}
    </LineChart>
  );
};

export default Graph;
