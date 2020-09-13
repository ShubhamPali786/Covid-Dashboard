import React from 'react'
import { Line } from 'react-chartjs-2';
import StateChartStyles from './StateChart.module.css';

interface StateChartProps{
    data:{}
}

const StateChart:React.FC<StateChartProps>=(props)=>{

    let options = {
		
		key: 'dailyConfirmed',
		labels: {
			fontColor: 'rgb(255,255,255)',
		},
		title: {
			display: true,
			text: '',
			fontSize: 20,
			fontColor: 'rgb(255,255,255)',
		},
		legend: {
			display: true,
			position: 'top',
			labels :{
				usePointStyle :true,
				fontFamily:"Source Sans Pro, sans-serif",
				fontColor: '#003f5c'
			},
			
		},
		maintainAspectRatio: false,
		scales: {
			yAxes: [
				{
					ticks: {
						fontColor: '#003f5c',
						stepSize: 100,
						beginAtZero: true,
						fontFamily:"Source Sans Pro, sans-serif"
					},
					display:false,
					type:'logarithmic'
				},
			],
			xAxes: [
				{
					ticks: {
						fontColor: '#003f5c',
						stepSize:10,
						beginAtZero: true,
						fontFamily:"Source Sans Pro, sans-serif"
					},
				},
			],
		},
	};

    return <div className={StateChartStyles.chart_container}>
      <Line data={props.data} options={options} />
</div>;
}

export default StateChart;