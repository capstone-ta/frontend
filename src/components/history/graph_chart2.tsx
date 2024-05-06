import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};


interface GraphProps {
  filePath: string;
}

const GraphChart2: React.FC<GraphProps> = ({filePath}) => {
  const [data, setData] = useState<string[]>([]);
  const [data2, setData2] = useState<string[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
           await fetch(filePath)
          .then(response => response.json())
          .then(data => {
              setData(data.current)
              setLabels(data.voltage)
               const y_baseline = data.baseline.map((row: any) => row[1]);
                setData2(y_baseline);
          }).catch(error => console.log(error));

        } 
        fetchData();
      }, []);
  
      let data_graph1 = {
        labels,
        datasets: [
          {
            label: 'Sebelum Correction',
            data: data,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            pointRadius: 0
          },
          {
            label: 'Setelah Correction',
            data: data2,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            pointRadius: 0
          },
        ],
      };  

  return (
    <div>
      <Line data={data_graph1} options={options} />
    </div>
  );
};

export default GraphChart2;