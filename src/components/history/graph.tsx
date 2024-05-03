import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface DataPoint {
  x: number;
  y: number;
}

const specialPoint = [{ x: 0.0204151, y: 146.915 }, { x: 0.0204151, y: 146.915 - 20 }];


const renderSpecialDot = (props: any) => {
    const { cx, cy, stroke, strokeWidth, r } = props;
    for(var i = 0; i < specialPoint.length; i++) {
        if (props.payload.x === specialPoint[i].x && props.payload.y === specialPoint[i].y) {
            return (
            <g>
                <circle cx={cx} cy={cy} r={r + 4} stroke="#ff7300" fill="#ff7300" strokeWidth={strokeWidth} />
            </g>
            );
        }
    }
  };

interface GraphProps {
  filePath: string;
}


const Graph: React.FC<GraphProps> = ({ filePath }) => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [data2, setData2] = useState<DataPoint[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const responseJson = fetch(filePath)
      .then(response => response.json())
      .then(data => {
          console.log(data)
          let mappedArray = data.current.map((xValue, index) => {
              // Check if array lengths are equal to avoid out-of-bounds access
              if (index >= data.voltage.length) {
                throw new Error('Arrays have different lengths');
              }
            
              return { y: xValue, x: data.voltage[index] };
            });
            setData(mappedArray);
          mappedArray = data.baseline.map((coordinatePair) => {
              return {
                x: coordinatePair[0],
                y: coordinatePair[1],
              };
            });
            
            setData2(mappedArray);
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
      <Line name="pengukuran" data={data} type="monotone" dataKey="y" stroke="#8884d8" activeDot={{r: 4}} dot={renderSpecialDot}/>
      <Line name="after baseline correction" data={data2} dot={renderSpecialDot} type="monotone" dataKey="y" stroke="#a83232" activeDot={{r: 4}} />
    </LineChart>
  );
};

export default Graph;
