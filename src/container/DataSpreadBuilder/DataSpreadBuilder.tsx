import React from 'react';
import { StoreModel } from '../../store/reducers';
import { connect } from 'react-redux';
import { BaseProps } from '../../shared/BaseProps/BaseProps';
import { prepareDailyDataset, PrepareMonthlyDataSet, prepareWeeklyDataset } from './DataSpreadBuilderHelper';
import { DailyCasesModel, MonthlyDataModel, WeeklyDataModel } from '../../models/DataSpread-Models';
import ChartBuilder from '../../components/DistributedChartsBuilder/ChartBuilder';
import ChartStyles from '../../shared/styles/charts.module.css';

interface DataSpreadBuilderProps extends BaseProps {}
interface DataSpreadState {}

class DataSpreadBuilder extends React.Component<DataSpreadBuilderProps, DataSpreadState> {
	componentDidMount() {}

	getMonthlyCovidData = () => {
		let monthlyCovidDataModel: MonthlyDataModel = PrepareMonthlyDataSet();
		const monthyCovid_dataset = {
			labels: monthlyCovidDataModel.months,
			datasets: [
				{
					label: 'Confirmed Cases',
					fill: false,
					lineTension: 0.5,
					backgroundColor: '#2E9BC6',
					hoverBorderColor: 'black',
					fillColor: 'blue',
					borderColor: 'rgb(255,255,255)',
					borderWidth: 0,
					data: monthlyCovidDataModel.confirmed,
				},
				{
					label: 'Recovered Cases',
					fill: false,
					lineTension: 0.5,
					backgroundColor: '#2DC6EA',

					hoverBorderColor: 'black',
					fillColor: 'blue',
					borderColor: 'rgb(255,255,255)',
					borderWidth: 0,
					data: monthlyCovidDataModel.recovered,
				},
				{
					label: 'deceased Cases',
					fill: false,
					lineTension: 0.5,
					backgroundColor: '#2EE3E3',

					hoverBorderColor: 'black',
					fillColor: 'blue',
					borderColor: 'rgb(255,255,255)',
					borderWidth: 0,
					data: monthlyCovidDataModel.deaths,
				},
			],
		};
		return monthyCovid_dataset;
	};
	getWeeklyCovidDataSet = () => {
		const weeklyDataModel: WeeklyDataModel = prepareWeeklyDataset(this.props.covidData);
		const weekly_dataset = {
			labels: weeklyDataModel.label,
			datasets: [
				{
					label: 'Confirmed Cases',
					fill: false,
					lineTension: 0.5,
					backgroundColor: '#ef4648',
					hoverBorderColor: 'black',
					fillColor: 'blue',
					borderColor: 'rgb(255,255,255)',
					borderWidth: 0,
					data: weeklyDataModel.data.weeklyConfirmed,
				},
				{
					label: 'Recovered Cases',
					fill: false,
					lineTension: 0.5,
					backgroundColor: '#f99e4c',
					hoverBorderColor: 'black',
					fillColor: 'blue',
					borderColor: 'rgb(255,255,255)',
					borderWidth: 0,
					data: weeklyDataModel.data.weeklyRecovered,
				},
				{
					label: 'Deceased Cases',
					fill: false,
					lineTension: 0.5,
					backgroundColor: '#f36f38',
					hoverBorderColor: 'black',
					fillColor: 'blue',
					borderColor: 'rgb(255,255,255)',
					borderWidth: 0,
					data: weeklyDataModel.data.weeklyDeaths,
				},
			],
		};
		return weekly_dataset;
	};

	getdailyCovidDataSet = () => {
		let dailyCovidDataModel: DailyCasesModel = prepareDailyDataset(this.props.covidData);
		let dailyConfirmedModel = {
			label: 'Confirmed Cases',
			hoverBackgroundColor: 'red',
			borderColor: '#FF5E7F',
			data: dailyCovidDataModel.dailyConfirmed,
			backgroundColor: '#FFE0E6',
			pointBackgroundColor: '#FF073A',
		};
		let dailyRecoveredModel = {
			label: 'Recovered Cases',
			hoverBackgroundColor: 'green',
			borderColor: '#73C686',
			data: dailyCovidDataModel.dailyRecovered,
			backgroundColor: '#E4F4E8',
			pointBackgroundColor: '#28A745',
		};
		return this.combineDailyCovidData(dailyConfirmedModel, dailyRecoveredModel, dailyCovidDataModel);
	};

	combineDailyCovidData = (confirmProps: object, recoverProps: object, dailyCovidDataModel: DailyCasesModel) => {
		let dailyCovidDataSet = [
			{
				labels: dailyCovidDataModel.date,
				datasets: [
					{
						...confirmProps,
						hoverBorderColor: 'white', // hover point border color
						borderWidth: 1,
						fill: true,
						pointRadius: 0,
						pointBorderColor: 'white',
						steppedLine: true,
					},
				],
			},
			{
				labels: dailyCovidDataModel.date,
				datasets: [
					{
						...recoverProps,
						hoverBorderColor: 'white', // hover point border color
						borderWidth: 1,
						fill: true,
						pointRadius: 0,
						pointBorderColor: 'white',
						steppedLine: true,
					},
				],
			},
		];

		return dailyCovidDataSet;
	};

	getChartDataSets = () => {
		const lineChartClass = [ChartStyles.Chart, ChartStyles.LineChart];
		const barChartClass = [ChartStyles.Chart, ChartStyles.BarChart];
		const recoverdChartClasses = [ChartStyles.Chart, ChartStyles.RecoverdChart];
		let spreadChart_data = [
			{
				chartType: 'line',
				dataset: this.getdailyCovidDataSet()[0],
				chartName: 'dailyConfirmed',
				classes: lineChartClass.join(' '),
			},
			{
				chartType: 'bar',
				dataset: this.getMonthlyCovidData(),
				chartName: 'monthyconfirmed',
				classes: barChartClass.join(' '),
			},
			{
				chartType: 'bar',
				dataset: this.getWeeklyCovidDataSet(),
				chartName: 'weeklyconfirmed',
				classes: barChartClass.join(' '),
			},
			{
				chartType: 'line',
				dataset: this.getdailyCovidDataSet()[1],
				chartName: 'dailyRecovered',
				classes: recoverdChartClasses.join(' '),
			},
		];

		return spreadChart_data;
	};

	render() {
		let chartDataSets = this.getChartDataSets();
		return (
			<div className={ChartStyles.LineCharts}>
				{chartDataSets.map((item) => {
					return <ChartBuilder chartModel={item} key={item.chartName} />;
				})}
			</div>
		);
	}
}

const mapStateToProps = (state: StoreModel) => {
	return {
		covidData: state.dashboard.covidData,
	};
};

export default connect(mapStateToProps)(DataSpreadBuilder);
