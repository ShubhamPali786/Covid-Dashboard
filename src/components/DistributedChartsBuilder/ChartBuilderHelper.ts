export const generateChartOptions = () => {
	let chart_options = [
		generateDailyConfirmChartOptions(),
		genrateDailyRecoverChartOptions(),
		generateMonthyChartOptions(),
		generateWeeklyChartOptions(),
	];
	return chart_options;
};

const generateWeeklyChartOptions = () => {
	return {
		key: 'weeklyconfirmed',
		labels: {
			fontColor: 'rgb(255,255,255)',
		},
		title: {
			display: true,
			text: 'Weekly Spread',
			fontSize: 20,
			fontColor: '#ef4648',
			fontFamily: 'Source Sans Pro, sans-serif',
		},
		legend: {
			display: false,
			position: 'right',
		},
		maintainAspectRatio: false,
		scales: {
			yAxes: [
				{
					ticks: {
						fontColor: '#003f5c',
						stepSize: 5000,
						beginAtZero: true,
						fontFamily: 'Source Sans Pro, sans-serif',
					},
				},
			],
			xAxes: [
				{
					ticks: {
						fontColor: '#003f5c',
						stepSize: 500,
						beginAtZero: true,
						fontFamily: 'Source Sans Pro, sans-serif',
					},
				},
			],
		},
	};
};

const generateMonthyChartOptions = () => {
	return {
		key: 'monthyconfirmed',
		labels: {
			fontColor: 'rgb(255,255,255)',
		},
		title: {
			display: true,
			text: 'Monthly Spread',
			fontSize: 20,
			fontColor: '#2E9BC6',
			fontFamily: "'Source Sans Pro', sans-serif",
		},
		legend: {
			display: false,
			position: 'top',
		},
		maintainAspectRatio: false,
		scales: {
			yAxes: [
				{
					ticks: {
						fontColor: '#003f5c',
						stepSize: 30000,
						beginAtZero: true,
						fontFamily: 'Source Sans Pro, sans-serif',
					},
				},
			],
			xAxes: [
				{
					ticks: {
						fontColor: '#003f5c',
						stepSize: 500,
						beginAtZero: true,
						fontFamily: 'Source Sans Pro, sans-serif',
					},
				},
			],
		},
	};
};
const genrateDailyRecoverChartOptions = () => {
	return {
		key: 'dailyRecovered',
		labels: {
			fontColor: 'rgb(255,255,255)',
		},
		title: {
			display: true,
			text: 'Recovered Cases',
			fontSize: 20,
			fontColor: '#28A745',
			fontFamily: 'Source Sans Pro, sans-serif',
		},
		legend: {
			display: false,
			position: 'right',
		},
		maintainAspectRatio: false,
		scales: {
			yAxes: [
				{
					ticks: {
						fontColor: '#003f5c',
						stepSize: 500,
						beginAtZero: true,
						fontFamily: 'Source Sans Pro, sans-serif',
					},
				},
			],
			xAxes: [
				{
					ticks: {
						fontColor: '#003f5c',
						stepSize: 5000,
						beginAtZero: true,
						fontFamily: 'Source Sans Pro, sans-serif',
					},
				},
			],
		},
	};
};

const generateDailyConfirmChartOptions = () => {
	return {
		key: 'dailyConfirmed',
		labels: {
			fontColor: 'white',
		},
		title: {
			display: true,
			text: 'Confirmed Cases',
			fontSize: 20,
			fontColor: '#FF073A',
			fontFamily: 'Source Sans Pro, sans-serif',
		},
		legend: {
			display: false,
		},
		maintainAspectRatio: false,
		scales: {
			yAxes: [
				{
					ticks: {
						fontColor: '#003f5c',
						stepSize: 500,
						beginAtZero: true,
						fontFamily: 'Source Sans Pro, sans-serif',
					},
				},
			],
			xAxes: [
				{
					ticks: {
						fontColor: '#003f5c',
						stepSize: 500,
						beginAtZero: true,
						fontFamily: 'Source Sans Pro, sans-serif',
					},
				},
			],
		},
	};
};
