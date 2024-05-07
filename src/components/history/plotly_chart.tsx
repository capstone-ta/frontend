import React, { useState, useEffect } from 'react';
import Plot from "react-plotly.js";


interface GraphProps {
  filePath: string;
}

const Plotly: React.FC<GraphProps> = ({ filePath }) => {
  const [dataPengukuranAsli, setDataPengukuranAsli] = useState<number[][]>([]);
  const [dataBaseline1, setDataBaseline1] = useState<number[][]>([]);
  const [dataBaseline2, setDataBaseline2] = useState<number[][]>([]);
  const [dataPuncak1, setDataPuncak1] = useState<number[][]>([]);
  const [dataPuncak2, setDataPuncak2] = useState<number[][]>([]);
  const [isCV, setIsCV] = useState<Boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      await fetch(filePath)
      .then(response => response.json())
      .then(data => {
            setDataPengukuranAsli([data.voltage, data.current]);
          if (data.baseline != null) {

            let xValues = data.baseline.map(([x, _]: [number, unknown]) => x); // Extract x values
            let yValues = data.baseline.map(([_, y]: [unknown, number]) => y); // Extract y values

            setDataBaseline1([xValues, yValues]);

            xValues = [data.info.v, data.info.v];
            yValues = [data.info.c, data.info.b[1]];

            setDataPuncak1([xValues, yValues]);
              
          } else {
            setIsCV(true)
            let xValues = data.baseline_oxidation.map(([x, _]: [number, unknown]) => x); // Extract x values
            let yValues = data.baseline_oxidation.map(([_, y]: [unknown, number]) => y); // Extract y values
            
            setDataBaseline1([xValues, yValues]);

            xValues = data.baseline_reduction.map(([x , _]: [number, unknown]) => x); // Extract x values
            yValues = data.baseline_reduction.map(([_, y] : [unknown, number]) => y); // Extract y values
            
            setDataBaseline2([xValues, yValues]);

            xValues = [data.info.oxidation.v, data.info.oxidation.v];
            yValues = [data.info.oxidation.c, data.info.oxidation.b];

            setDataPuncak1([xValues, yValues]);

            xValues = [data.info.reduction.v, data.info.reduction.v];
            yValues = [data.info.reduction.c, data.info.reduction.b];

            setDataPuncak2([xValues, yValues]);
          }
      }).catch(error => console.log(error));
    } 


    fetchData();
  }, []);

  console.log(dataPengukuranAsli[0])

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
