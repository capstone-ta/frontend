import React from 'react';
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

const dataString = `"-0.50017,139.159"
"-0.489963,142.295"
"-0.479755,139.103"
"-0.469548,132.159"
"-0.45934,129.359"
"-0.449133,129.415"
"-0.438925,127.455"
"-0.428717,125.495"
"-0.41851,122.359"
"-0.408302,120.231"
"-0.398095,118.943"
"-0.387887,118.215"
"-0.37768,116.927"
"-0.367472,116.311"
"-0.357264,115.975"
"-0.347057,115.135"
"-0.336849,114.463"
"-0.326642,114.687"
"-0.316434,114.519"
"-0.306227,114.365"
"-0.296019,114.127"
"-0.285811,114.127"
"-0.275604,113.791"
"-0.265396,113.567"
"-0.255189,114.015"
"-0.244981,113.903"
"-0.234774,113.567"
"-0.224566,114.071"
"-0.214358,114.295"
"-0.204151,114.015"
"-0.193943,114.239"
"-0.183736,114.519"
"-0.173528,114.183"
"-0.163321,113.707"
"-0.153113,113.847"
"-0.142905,113.371"
"-0.132698,112.475"
"-0.12249,112.503"
"-0.112283,112.139"
"-0.102075,111.299"
"-0.0918681,110.879"
"-0.0816606,110.767"
"-0.071453,110.263"
"-0.0612454,110.571"
"-0.0510379,116.871"
"-0.0408303,127.987"
"-0.0306227,133.615"
"-0.0204151,138.543"
"-0.0102076,142.631"
"0,145.235"
"0.0102076,146.523"
"0.0204151,146.915"
"0.0306227,146.495"
"0.0408303,145.179"
"0.0510379,142.967"
"0.0612454,139.495"
"0.071453,134.791"
"0.0816606,129.779"
"0.0918681,125.215"
"0.102075,120.539"
"0.112283,116.087"
"0.12249,112.335"
"0.132698,108.303"
"0.142905,104.215"
"0.153113,101.695"
"0.163321,100.155"
"0.173528,98.5036"
"0.183736,97.7196"
"0.193943,97.2156"
"0.204151,96.2916"
"0.214358,95.3956"
"0.224566,95.5356"
"0.234774,95.0596"
"0.244981,94.3316"
"0.255189,94.6396"
"0.265396,94.7236"
"0.275604,94.3596"
"0.285811,94.3736"
"0.296019,94.8356"
"0.306227,94.5836"
"0.316434,94.7236"
"0.326642,94.7236"
"0.336849,94.7516"
"0.347057,94.7341"
"0.357264,94.5976"
"0.367472,94.8636"
"0.37768,94.5276"
"0.387887,94.3596"
"0.398095,94.8776"
"0.408302,94.7656"
"0.41851,94.8461"
"0.428717,94.8216"
"0.438925,94.9196"
"0.449133,94.4716"
"0.45934,94.6676"
"0.469548,95.0176"
"0.479755,94.7376"
"0.489963,94.4296"
"0.50017,95.0176"`;

// Memisahkan setiap baris
const lines = dataString.trim().split("\n");

// Inisialisasi dua array untuk nilai x dan y
const xValues = [];
const yValues = [];
const yValuesCorrection = [];

// Memisahkan nilai x dan y dari setiap baris
lines.forEach(line => {
  const [x, y] = line.replace(/"/g, '').trim().split(",")
  xValues.push(parseFloat(x + "\""));
  yValues.push(parseFloat(y));
    yValuesCorrection.push(parseFloat(y) - 20);
});


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

const labels = xValues;


const GraphChart2: React.FC = () => {
  const data = {
    labels,
    datasets: [
      {
        label: 'Sebelum Correction',
        data: yValues,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        pointRadius: 0
      },
      {
        label: 'Setelah Correction',
        data: yValuesCorrection,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        pointRadius: 0
      },
    ],
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default GraphChart2;