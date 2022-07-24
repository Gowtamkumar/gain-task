import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import datas from '../../Data/data.1658411149'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const BarChartReport = (value, booleanvalue) => {
  if (value === "used_phone") {
    return datas.filter((item) => item.used_phone === booleanvalue)
  } else if (value === "official_warranty") {
    return datas.filter((item) => item.official_warranty === booleanvalue)
  } else if (value === "unofficial_warranty") {
    return datas.filter((item) => item.unofficial_warranty === booleanvalue)
  } else if (value === "no_warranty") {
    return datas.filter((item) => item.no_warranty === booleanvalue)
  }
}

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Sources',
    },
    chartArea: {
      top: 0,
      left: 0,
      width: "50%",
      height: "100%"
    },
  },
};

const labels = ['Offical', 'Unoffical', 'Without Warranty', 'Used'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Sources',
      data: [
        BarChartReport("official_warranty", true).length,
        BarChartReport("unofficial_warranty", true).length,
        BarChartReport("no_warranty", true).length,
        BarChartReport("used_phone", true).length,
      ],
      backgroundColor: '#0095A0',
    }
  ],
};

export default function BarChart() {
  return (
  
    <Bar data={data} />
  )
}
