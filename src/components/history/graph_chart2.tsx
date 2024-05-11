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
    tooltip: {
      callbacks: {
        label: (context: any) => {
          let label = "";
          if (context.parsed.y) {
            label = context.parsed.y + "%"
          }
          return label;
        }
      }
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
  const [dataPengukuranAsliOxidation, setDataPengukuranAsliOxidation] = useState<number[][]>([]);
  const [dataPengukuranAsliReduction, setDataPengukuranAsliReduction] = useState<number[][]>([]);
  const [labels, setLabels] = useState<number[][]>([]);
  const [dataBaseline1, setDataBaseline1] = useState<number[][]>([]);
  const [dataBaseline2, setDataBaseline2] = useState<number[][]>([]);
  const [dataPuncak1, setDataPuncak1] = useState<number[][]>([]);
  const [dataPuncak2, setDataPuncak2] = useState<number[][]>([]);
  const [puncak1, setPuncak1] = useState<number>(0);
  const [puncak2, setPuncak2] = useState<number>(0);
  const [isCV, setIsCV] = useState<Boolean>(false);
  
    useEffect(() => {
        const fetchData = async () => {
           await ChartJsAPI(filePath).then((result: any) => {
            console.log(result)
            setLabels(result[0])
            setDataPengukuranAsliOxidation(result[1])
            setDataPengukuranAsliReduction(result[2])
            setDataBaseline1(result[3])
            setDataBaseline2(result[4])
            setDataPuncak1(result[5])
            setDataPuncak2(result[6])
            setIsCV(result[7])
            setPuncak1(result[5][0][1] - result[5][1][1]);
            setPuncak2(result[6][0][1] - result[6][1][1]);
            
           });

        } 
        fetchData();
      }, []);
      let data_graph = {
        labels,
        datasets: [
          {
            label: 'Sebelum Correction',
            data: dataPengukuranAsliOxidation,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            pointRadius: 0
          },
          {
            label: 'Setelah Correction',
            data: dataBaseline1,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            pointRadius: 0
          },
          {
            label: 'Puncak (' + (puncak1).toString() + ')',
            data: dataPuncak1,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            pointRadius: 0
          },
        ],
      };  
      if (isCV) {
        data_graph = {
          labels,
          datasets: [
            {
              label: 'Sebelum Correction - oxidation',
              data: dataPengukuranAsliOxidation,
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              pointRadius: 0
            },
            {
              label: 'Sebelum Correction - reduction',
              data: dataPengukuranAsliReduction,
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              pointRadius: 0
            },
            {
              label: 'Setelah Correction - oxidation',
              data: dataBaseline1,
              borderColor: 'rgb(53, 162, 235)',
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
              pointRadius: 0
            },
            {
              label: 'Setelah Correction - oxidation',
              data: dataBaseline2,
              borderColor: 'rgb(53, 162, 235)',
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
              pointRadius: 0
            },
            {
              label: 'Puncak - oxidation (' + (puncak1).toString() + ')',
              data: dataPuncak1,
              borderColor: 'rgb(53, 162, 235)',
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
              pointRadius: 0
            },
            {
              label: 'Puncak - reduction (' + (puncak2).toString() + ')',
              data: dataPuncak2,
              borderColor: 'rgb(53, 162, 235)',
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
              pointRadius: 0
            }
          ],
        };  
      }
      

  return (
    <div>
      <Line data={data_graph} options={options} />
    </div>
  );
};

export default GraphChart2;