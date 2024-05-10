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
import { ChartJsAPI } from '../../api/chartjsChart';

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
           await ChartJsAPI(filePath).then((result: any) => {
            console.log(result)
            setData(result[0]);
            setData2(result[1]);
            setLabels(result[2]);
           });

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