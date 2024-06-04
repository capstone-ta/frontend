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
  filePath1: string;
  filePath2: string;
}

interface GraphData {
  labels: number[];
  dataPengukuranAsliOxidation: number[]
  dataPengukuranAsliReduction: number[]
  dataBaseline1: number[]
  dataBaseline2: number[]
  dataPuncak1: number[]
  dataPuncak2: number[]
  puncak1: number
  puncak2: number
}

const GraphChart2: React.FC<GraphProps> = ({filePath1, filePath2}) => {
  const [dataGraph1, setDataGraph1] = useState<any>(
    {
      labels: [1,2,3],
      datasets: [{
        label: 'Setelah Correction',
        data: [1,2,3],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        pointRadius: 0
      }]
    }
  );
  const [isCV, setIsCV] = useState<Boolean>(false);
  
    useEffect(() => {
        const fetchData = async () => {
          let data_graph_1 = {
            labels: [1,2,3],
            datasets: [{
              label: 'Setelah Correction',
              data: [1,2,3],
              borderColor: 'rgb(53, 162, 235)',
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
              pointRadius: 0
            }]
          }
           await ChartJsAPI(filePath1).then( (result: any) => {
            console.log(result)
            let graphData: GraphData = {
              labels: result[0],
              dataPengukuranAsliOxidation: result[1],
              dataPengukuranAsliReduction: result[2],
              dataBaseline1: result[3],
              dataBaseline2: result[4],
              dataPuncak1: result[5],
              dataPuncak2: result[6],
              puncak1: result[5][0][1] - result[5][1][1],
              puncak2: result[6].length > 0 ? result[6][0][1] - result[6][1][1] : 0
            }
            setIsCV(result[7])

            data_graph_1 = {
              labels: graphData?.labels,
              datasets: [
                {
                  label: 'Sebelum Correction',
                  data: graphData?.dataPengukuranAsliOxidation,
                  borderColor: 'rgb(102, 252, 3)',
                  backgroundColor: 'rgba(102, 252, 3, 0.5)',
                  pointRadius: 0
                },
                {
                  label: 'Setelah Correction',
                  data: graphData?.dataBaseline1,
                  borderColor: 'rgb(102, 252, 3)',
                  backgroundColor: 'rgba(102, 252, 3, 0.5)',
                  pointRadius: 0
                },
                {
                  label: 'Puncak (' + (graphData?.puncak1).toString() + ')',
                  data: graphData?.dataPuncak1,
                  borderColor: 'rgb(82, 3, 252)',
                  backgroundColor: 'rgba(82, 3, 252, 0.5)',
                  pointRadius: 0
                },
              ],
            };  
            console.log("DATA GRAPH 1")
            console.log(data_graph_1)
            if (isCV) {
              data_graph_1 = {
                labels: graphData?.labels,
                datasets: [
                  {
                    label: 'Sebelum Correction - oxidation',
                    data: graphData?.dataPengukuranAsliOxidation,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    pointRadius: 0
                  },
                  {
                    label: 'Sebelum Correction - reduction',
                    data: graphData?.dataPengukuranAsliReduction,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    pointRadius: 0
                  },
                  {
                    label: 'Setelah Correction - oxidation',
                    data: graphData?.dataBaseline1,
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    pointRadius: 0
                  },
                  {
                    label: 'Setelah Correction - oxidation',
                    data: graphData?.dataBaseline2,
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    pointRadius: 0
                  },
                  {
                    label: 'Puncak - oxidation (' + (graphData?.puncak1).toString() + ')',
                    data: graphData?.dataPuncak1,
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    pointRadius: 0
                  },
                  {
                    label: 'Puncak - reduction (' + (graphData?.puncak2).toString() + ')',
                    data: graphData?.dataPuncak2,
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    pointRadius: 0
                  }
                ],
              };  
            }
            
           });

           
           if (filePath2 !== "") {
            await ChartJsAPI(filePath2).then( (result: any) => {
              let graphData: GraphData = {
                labels: result[0],
                dataPengukuranAsliOxidation: result[1],
                dataPengukuranAsliReduction: result[2],
                dataBaseline1: result[3],
                dataBaseline2: result[4],
                dataPuncak1: result[5],
                dataPuncak2: result[6],
                puncak1: result[5][0][1] - result[5][1][1],
                puncak2: result[6].length > 0 ? result[6][0][1] - result[6][1][1] : 0
              }
              data_graph_1.datasets.push({
                label: 'Sebelum Correction',
                    data: graphData?.dataPengukuranAsliOxidation,
                    borderColor: 'rgb(252, 3, 78)',
                    backgroundColor: 'rgba(252, 3, 78, 0.5)',
                    pointRadius: 0
              })
              data_graph_1.datasets.push({
                label: 'Setelah Correction',
                    data: graphData?.dataBaseline1,
                    borderColor: 'rgb(252, 3, 78)',
                    backgroundColor: 'rgba(252, 3, 78, 0.5)',
                    pointRadius: 0
              })
              data_graph_1.datasets.push({
                label: 'Puncak (' + (graphData?.puncak1).toString() + ')',
                    data: graphData?.dataPuncak1,
                    borderColor: 'rgb(82, 3, 252)',
                    backgroundColor: 'rgba(82, 3, 252, 0.5)',
                    pointRadius: 0
              })
              console.log("MARK")
              console.log(data_graph_1)
              setDataGraph1(data_graph_1);
            });
           }
        } 
        fetchData();
      }, []);
      
      
      console.log(dataGraph1)
  return (
    <div>
      <div>
        <Line data={dataGraph1} options={options} />
      </div>
    </div>
  )
};

export default GraphChart2;