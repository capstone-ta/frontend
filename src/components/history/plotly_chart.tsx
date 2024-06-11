import React, { useState, useEffect } from 'react';
import Plot from "react-plotly.js";
import { PlotlyChartAPI } from '../../api/plotlyChart';

interface GraphData {
  dataPengukuranAsli: number[][];
  dataBaseline1: number[][];
  dataBaseline2: number[][];
  dataPuncak1: number[][];
  dataPuncak2: number[][];
  puncak1: number;
  puncak2: number;
}

const Plotly: React.FC<{filePath1: string, filePath2: string}> = ({ filePath1,  filePath2}) => {
  const [dataGraph1, setDataGraph1] = useState<GraphData>({
    dataPengukuranAsli: [],
    dataBaseline1: [],
    dataBaseline2: [],
    dataPuncak1: [],
    dataPuncak2: [],
    puncak1: 0,
    puncak2: 0
  });
  const [dataGraph2, setDataGraph2] = useState<GraphData>({
    dataPengukuranAsli: [],
    dataBaseline1: [],
    dataBaseline2: [],
    dataPuncak1: [],
    dataPuncak2: [],
    puncak1: 0,
    puncak2: 0
  });
  const [isCV, setIsCV] = useState<Boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      await PlotlyChartAPI(filePath1).then((result: any) => {
        let graphData: GraphData = {
          dataPengukuranAsli: result[0],
          dataBaseline1: result[1],
          dataBaseline2: result[2],
          dataPuncak1: result[3],
          dataPuncak2: result[4],
          puncak1: parseFloat((result[3][1][0] - result[3][1][1]).toFixed(2)),
          puncak2: result[4].length > 0 ? parseFloat((result[4][1][0] - result[4][1][1]).toFixed(2)) : 0
        }
        setDataGraph1(graphData);
        setIsCV(result[5]);
      })
      if (filePath2 !== "") {
        await PlotlyChartAPI(filePath2).then((result: any) => {
          let graphData: GraphData = {
            dataPengukuranAsli: result[0],
            dataBaseline1: result[1],
            dataBaseline2: result[2],
            dataPuncak1: result[3],
            dataPuncak2: result[4],
            puncak1: parseFloat((result[3][1][0] - result[3][1][1]).toFixed(2)),
            puncak2: result[4].length > 0 ? parseFloat((result[4][1][0] - result[4][1][1]).toFixed(2)) : 0
          }
          setDataGraph2(graphData);
        });
      }
    } 
    fetchData();
  }, []);


  return (
      <Plot
        data={[
          {
            type: 'scatter',
            x: dataGraph1?.dataPengukuranAsli[0], // Wrap the number in an array
            y: dataGraph1?.dataPengukuranAsli[1], // Wrap the number in an array
            mode: 'lines',
            name: 'Pengukuran asli',
            line: {
              color: 'rgb(219, 64, 82)',
              width: 3
            }
          },
          {
            type: 'scatter',
            x: dataGraph1?.dataBaseline1[0], // Wrap the number in an array
            y: dataGraph1?.dataBaseline1[1], // Wrap the number in an array
            mode: 'lines',
            name: isCV ? "Baseline correction - oksidasi" : "Baseline correction",
            line: {
              color: 'rgb(219, 64, 82)',
              width: 2
            }
          },
          isCV ? {
            type: 'scatter',
            x: dataGraph1?.dataBaseline2[0], // Wrap the number in an array
            y: dataGraph1?.dataBaseline2[1], // Wrap the number in an array
            mode: 'lines',
            name: 'Baseline correction - reduksi',
            line: {
              color: 'rgb(219, 64, 82)',
              width: 2
            }
          } : {},
          {
            type: 'scatter',
            x: dataGraph1?.dataPuncak1[0], // Wrap the number in an array
            y: dataGraph1?.dataPuncak1[1], // Wrap the number in an array
            mode: 'lines',
            name: isCV ? "Puncak - oksidasi" : "Puncak",
            line: {
              dash: 'dashdot',
              color: 'rgb(128, 0, 128)',
              width: 1
            }
          },
          isCV ? {
            type: 'scatter',
            x: dataGraph1?.dataPuncak2[0], // Wrap the number in an array
            y: dataGraph1?.dataPuncak2[1], // Wrap the number in an array
            mode: 'lines',
            name: 'Puncak - reduksi',
            line: {
              dash: 'dashdot',
              color: 'rgb(128, 0, 128)',
              width: 1
            }
          } : {},
          isCV ? {
            type: 'scatter',
            x: [dataGraph1?.dataPuncak1[0][0]], // Wrap the number in an array
            y: [dataGraph1?.dataPuncak1[1][0] / 2], // Wrap the number in an array
            mode: 'text',
            text: dataGraph1?.puncak1.toString(),
            line: {
              dash: 'dashdot',
              color: 'rgb(128, 0, 128)',
              width: 1
            }
          } : {},
          isCV ? {
            type: 'scatter',
            x: [dataGraph1?.dataPuncak2[0][0]], // Wrap the number in an array
            y: [dataGraph1?.dataPuncak2[1][0] / 2], // Wrap the number in an array
            mode: 'text',
            text: dataGraph1?.puncak2.toString(),
            line: {
              dash: 'dashdot',
              color: 'rgb(128, 0, 128)',
              width: 1
            }
          } : {},
          !isCV ? {
            type: 'scatter',
            x: dataGraph2?.dataPengukuranAsli[0], // Wrap the number in an array
            y: dataGraph2?.dataPengukuranAsli[1], // Wrap the number in an array
            mode: 'lines',
            name: 'Pengukuran asli',
            line: {
              color: 'rgb(55, 128, 191)',
              width: 3
            }
          } : {},
          !isCV ? {
            type: 'scatter',
            x: dataGraph2?.dataBaseline1[0], // Wrap the number in an array
            y: dataGraph2?.dataBaseline1[1], // Wrap the number in an array
            mode: 'lines',
            name: "Baseline correction",
            line: {
              color: 'rgb(55, 128, 191)',
              width: 2
            }
          } : {},
          !isCV ? {
            type: 'scatter',
            x: dataGraph2?.dataPuncak1[0], // Wrap the number in an array
            y: dataGraph2?.dataPuncak1[1], // Wrap the number in an array
            mode: 'lines',
            name: "Puncak",
            line: {
              dash: 'dashdot',
              color: 'rgb(128, 0, 128)',
              width: 1
            }
          } : {},
        ]}
        layout={{
          title: "Hasil Pengukuran",
          xaxis: {
            title: "V",
          },
          yaxis: {
            title: "µA",
          },
          width: 750,
          height: 375
        }}
      />
  );
};

export default Plotly;
