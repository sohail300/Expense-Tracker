import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

const PieChart = (props) => {
    const income=props.income;
    const expense=props.expense;
    const balance=props.balance;
    
    const expenseData=expense/income*100;
    const balanceData=balance/income*100;

    Chart.register(ArcElement);

  // Define your data
  const data = {
    labels: ['Expense', 'Balance'],
    datasets: [
      {
        data: [expenseData, balanceData], // You can adjust these values according to your data
        backgroundColor: ['rgba(255, 50, 0, 0.8)', 'rgb(255, 165, 0)'], // Colors for the segments
      },
    ],
  };

  return (
    <div style={{height:"200px",width:"200px"}}>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
