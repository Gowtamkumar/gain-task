import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import allData from '../../Data/data.1658411149'

ChartJS.register(ArcElement, Tooltip, Legend);


const ProductFilter = (value) => {
  if (value === "Bikroy.com") {
    return allData.filter((item) => item.ad_category === value)
  } else {
    return allData.filter((item) => item.seller_name === value)
  }
}

let total = ProductFilter("Pickaboo").length + ProductFilter("Daraz").length + ProductFilter("Bikroy.com").length
// console.log("ddd", total);
// console.log("Daraz", (total / 100) * ProductFilter("Daraz").length);
// console.log("Bikroy", (total / 100) * ProductFilter("Bikroy.com").length);
// console.log("Pickaboo", (total / 100) * ProductFilter("Pickaboo").length);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: false,
      text: 'Condition'
    }
  }
};


export const data = {
  labels: [
    `Daraz ${(total / 100) * ProductFilter("Daraz").length} %`,
    `Bikroy ${(total / 100) * ProductFilter("Daraz").length} %`,
    `Pickaboo ${(total / 100) * ProductFilter("Pickaboo").length} %`
  ],
  datasets: [
    {
      label: '# of Votes',
      data: [
        (total / 100) * ProductFilter("Daraz").length,
        (total / 100) * ProductFilter("Bikroy.com").length,
        (total / 100) * ProductFilter("Pickaboo").length],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',

      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',

      ]

    },
  ],
};


export default function PieChart() {
  return (

    <Pie options={options} data={data} />
  )
}
