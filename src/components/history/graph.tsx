import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';

interface DataPoint {
  x: number;
  y: number;
}

interface GraphProps {
  filePath: string;
}


const Graph: React.FC<GraphProps> = ({ filePath }) => {
  const [dataPengukuranAsli, setDataPengukuranAsli] = useState<DataPoint[]>([]);
  const [dataBaseline1, setDataBaseline1] = useState<DataPoint[]>([]);
  const [dataBaseline2, setDataBaseline2] = useState<DataPoint[]>([]);
  const [dataPuncak1, setDataPuncak1] = useState<DataPoint[]>([]);
  const [dataPuncak2, setDataPuncak2] = useState<DataPoint[]>([]);
  const [isCV, setIsCV] = useState<Boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      await fetch(filePath)
      .then(response => response.json())
      .then(data => {
          console.log(data)
          let mappedArray = data.current.map((xValue: string, index: string) => {
              // Check if array lengths are equal to avoid out-of-bounds access
              if (index >= data.voltage.length) {
                throw new Error('Arrays have different lengths');
              }
            
              return { y: xValue, x: data.voltage[index] };
            });
            setDataPengukuranAsli(mappedArray);
          if (data.baseline != null) {
              mappedArray = data.baseline.map((coordinatePair: [string, string]) => {
                return {
                  x: coordinatePair[0],
                  y: coordinatePair[1],
                };
              });
              
              setDataBaseline1(mappedArray);

              mappedArray = [{
                x: data.info.v,
                y: data.info.c
              }, {
                x: data.info.v,
                y: data.info.b[1]
              }]

              setDataPuncak1(mappedArray)
          } else {
            setIsCV(true)
            mappedArray = data.baseline_oxidation.map((coordinatePair: [string, string]) => {
              return {
                x: coordinatePair[0],
                y: coordinatePair[1],
              };
            });
            
            setDataBaseline1(mappedArray);

            mappedArray = data.baseline_reduction.map((coordinatePair: [string, string]) => {
              return {
                x: coordinatePair[0],
                y: coordinatePair[1],
              };
            });

            setDataBaseline2(mappedArray);

            mappedArray = [{
              x: data.info.oxidation.v,
              y: data.info.oxidation.c
            }, {
              x: data.info.oxidation.v,
              y: data.info.oxidation.b
            }]
            console.log(mappedArray)
            setDataPuncak1(mappedArray)

            mappedArray = [{
              x: data.info.reduction.v,
              y: data.info.reduction.c
            }, {
              x: data.info.reduction.v,
              y: data.info.reduction.b
            }]
            setDataPuncak2(mappedArray);
          }
      }).catch(error => console.log(error));
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
