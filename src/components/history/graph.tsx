import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';
import { RechartChartAPI } from '../../api/rechartChart';
import ChartDataPoint from '../../types/chart';

interface GraphData {
  dataPengukuranAsli: ChartDataPoint[];
  dataBaseline1: ChartDataPoint[];
  dataBaseline2: ChartDataPoint[];
  dataPuncak1: ChartDataPoint[];
  dataPuncak2: ChartDataPoint[];
  puncak1: number;
}

const Graph: React.FC<{filePath1: string, filePath2: string}> = ({ filePath1, filePath2 }) => {
  const [dataGraph1, setDataGraph1] = useState<GraphData>({
    dataPengukuranAsli: [],
    dataBaseline1: [],
    dataBaseline2: [],
    dataPuncak1: [],
    dataPuncak2: [],
    puncak1: 0
  });
  const [dataGraph2, setDataGraph2] = useState<GraphData>({
    dataPengukuranAsli: [],
    dataBaseline1: [],
    dataBaseline2: [],
    dataPuncak1: [],
    dataPuncak2: [],
    puncak1: 0
  });
  const [isCV, setIsCV] = useState<Boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      await RechartChartAPI(filePath1).then((result: any) => {
        let graphData: GraphData = {
          dataPengukuranAsli: result[0],
          dataBaseline1: result[1],
          dataBaseline2: result[2],
          dataPuncak1: result[3],
          dataPuncak2: result[4],
          puncak1: result[3][0].y - result[3][1].y,
        }
        setIsCV(result[5]);
        setDataGraph1(graphData);
      });
      if (filePath2 !== "") {
        await RechartChartAPI(filePath2).then((result: any) => {
          let graphData: GraphData = {
            dataPengukuranAsli: result[0],
            dataBaseline1: result[1],
            dataBaseline2: result[2],
            dataPuncak1: result[3],
            dataPuncak2: result[4],
            puncak1: result[3][0].y - result[3][1].y,
          }
          setDataGraph2(graphData);
        });
      }
    } 


    fetchData();
  }, []);

  return (
    <LineChart
      width={750}
      height={375}
      margin={{top: 5, right: 30, left: 20, bottom: 5}}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis label={{ value: 'V', position: 'insideBottom', offset: -5 }} type="number" dataKey="x" domain={['dataMin', 'dataMax']}/>
      <YAxis label={{ value: 'µA', angle: -90, position: 'insideLeft' }} />
      <Tooltip />
      <Legend verticalAlign="top" align="right" />
      <Line name="pengukuran" data={dataGraph1?.dataPengukuranAsli} type="monotone" dataKey="y" stroke="#8884d8" activeDot={{r: 4}} dot={false}/>
      <Line name={isCV ? "baseline correction - oksidasi" : "baseline correction"} data={dataGraph1?.dataBaseline1} dot={false} type="monotone" dataKey="y" stroke="#a83232" activeDot={{r: 4}} />
      {isCV ? <Line name="baseline correction - reduksi" data={dataGraph1?.dataBaseline2} dot={false} type="monotone" dataKey="y" stroke="#a83232" activeDot={{r: 4}} /> : null}
      <ReferenceLine label={dataGraph1?.puncak1} stroke="green" strokeDasharray="3 3" segment={dataGraph1?.dataPuncak1} />
      {isCV ? <ReferenceLine label={dataGraph1?.dataPuncak2[0].y - dataGraph1?.dataPuncak2[1].y} stroke="green" strokeDasharray="3 3" segment={dataGraph1?.dataPuncak2} /> : null}
      {isCV ? null : <Line name="pengukuran" data={dataGraph2?.dataPengukuranAsli} type="monotone" dataKey="y" stroke="#8884d8" activeDot={{r: 4}} dot={false}/>}
      {isCV ? null : <Line name="baseline correction" data={dataGraph2?.dataBaseline1} dot={false} type="monotone" dataKey="y" stroke="#a83232" activeDot={{r: 4}} />}
      {isCV ? null : <ReferenceLine label={dataGraph2?.puncak1} stroke="green" strokeDasharray="3 3" segment={dataGraph2?.dataPuncak1} />}
    </LineChart>
  );
};

export default Graph;
