import React, { useState, useEffect } from 'react';
import Plot from "react-plotly.js";
import { PlotlyChartAPI } from '../../api/plotlyChart';

const Plotly: React.FC<{filePath: string}> = ({ filePath }) => {
  const [dataPengukuranAsli, setDataPengukuranAsli] = useState<number[][]>([]);
  const [dataBaseline1, setDataBaseline1] = useState<number[][]>([]);
  const [dataBaseline2, setDataBaseline2] = useState<number[][]>([]);
  const [dataPuncak1, setDataPuncak1] = useState<number[][]>([]);
  const [dataPuncak2, setDataPuncak2] = useState<number[][]>([]);
  const [puncak1, setPuncak1] = useState<number>(0);
  const [puncak2, setPuncak2] = useState<number>(0);
  const [isCV, setIsCV] = useState<Boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      await PlotlyChartAPI(filePath).then((result: any) => {
        setDataPengukuranAsli(result[0]);
        setDataBaseline1(result[1]);
        setDataBaseline2(result[2]);
        setDataPuncak1(result[3]);
        setDataPuncak2(result[4]);
        console.log(result)
        setIsCV(result[5]);
        setPuncak1(result[3][1][0] - result[3][1][1])
        setPuncak2(result[4][1][0] - result[4][1][1])
      })
    } 
    fetchData();
  }, []);


  return (
    <div>
      <Plot
        data={[
          {
            type: 'scatter',
            x: dataPengukuranAsli[0], // Wrap the number in an array
            y: dataPengukuranAsli[1], // Wrap the number in an array
            mode: 'lines',
            name: 'Pengukuran asli',
            line: {
              color: 'rgb(55, 128, 191)',
              width: 3
            }
          },
          {
            type: 'scatter',
            x: dataBaseline1[0], // Wrap the number in an array
            y: dataBaseline1[1], // Wrap the number in an array
            mode: 'lines',
            name: isCV ? "Baseline correction - oksidasi" : "Baseline correction",
            line: {
              color: 'rgb(219, 64, 82)',
              width: 2
            }
          },
          isCV ? {
            type: 'scatter',
            x: dataBaseline2[0], // Wrap the number in an array
            y: dataBaseline2[1], // Wrap the number in an array
            mode: 'lines',
            name: 'Baseline correction - reduksi',
            line: {
              color: 'rgb(219, 64, 82)',
              width: 2
            }
          } : {},
          {
            type: 'scatter',
            x: dataPuncak1[0], // Wrap the number in an array
            y: dataPuncak1[1], // Wrap the number in an array
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
            x: dataPuncak2[0], // Wrap the number in an array
            y: dataPuncak2[1], // Wrap the number in an array
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
            x: [dataPuncak1[0][0]], // Wrap the number in an array
            y: [dataPuncak1[1][0] / 2], // Wrap the number in an array
            mode: 'text',
            text: puncak1.toString(),
            line: {
              dash: 'dashdot',
              color: 'rgb(128, 0, 128)',
              width: 1
            }
          } : {},
          isCV ? {
            type: 'scatter',
            x: [dataPuncak2[0][0]], // Wrap the number in an array
            y: [dataPuncak2[1][0] / 2], // Wrap the number in an array
            mode: 'text',
            text: puncak2.toString(),
            line: {
              dash: 'dashdot',
              color: 'rgb(128, 0, 128)',
              width: 1
            }
          } : {}
        ]}
        layout={{
          title: "Hasil Pengukuran",
          xaxis: {
            title: "V",
          },
          yaxis: {
            title: "µA",
          },
          width: 1500,
          height: 750
        }}
      />
    </div>
  );
};

export default Plotly;
