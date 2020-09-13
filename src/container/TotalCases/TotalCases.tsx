import React from 'react';
import { StoreModel } from '../../store/reducers';
import { connect } from 'react-redux';
import { CovidDataModel } from '../../models/covidData-Model';
import { TotalCasesModel } from '../../models/TotalCases-Model';
import TotalCaseGrid from '../../components/TotalCasesGridComponent/TotalCaseGrid';
import TotalCasesStyles from './TotalCases.module.css';
import { BaseProps } from '../../shared/BaseProps/BaseProps';

interface TotalCasesProps extends BaseProps {}
interface TotalCasesState {
	dailyCovidCases: TotalCasesModel[];
}

class TotalCases extends React.Component<TotalCasesProps, TotalCasesState> {
	state: TotalCasesState = {
		dailyCovidCases: [
			{
				lastUpdatedDate: '',
				name: '',
				newlyAdded: 0,
				totalCount: 0,
			},
		],
	};

	componentDidMount() {
		this.setDailyCovidCases();
	}

	getLastUpdateTime = (lastUpdateTime: string) => {
		let date_time = lastUpdateTime.split(' ');
		let date_arr = date_time[0].split('/');
		let time_arr = date_time[1].split(':');

		let lastUpdatedDate = new Date(
			parseInt(date_arr[2]),
			parseInt(date_arr[1]) - 1,
			parseInt(date_arr[0]),
			parseInt(time_arr[0]),
			parseInt(time_arr[1])
		);

		let currentDateTime = new Date();

		let lastUpdatedMsg = 'Just Now';

		if (currentDateTime.getMonth() - lastUpdatedDate.getMonth() > 0) {
			let timeDiff = currentDateTime.getMonth() - lastUpdatedDate.getMonth();
			let timeUnit = timeDiff === 1 ? 'month' : 'months';
			lastUpdatedMsg = `${currentDateTime.getMonth() - lastUpdatedDate.getMonth()} ${timeUnit} ago`;
			return lastUpdatedMsg;
		}
		if (currentDateTime.getDate() - lastUpdatedDate.getDate() > 0) {
			let timeDiff = currentDateTime.getDate() - lastUpdatedDate.getDate();
			let timeUnit = timeDiff === 1 ? 'day' : 'days';
			lastUpdatedMsg = `${currentDateTime.getDate() - lastUpdatedDate.getDate()} ${timeUnit} ago`;
			return lastUpdatedMsg;
		}
		if (currentDateTime.getHours() - lastUpdatedDate.getHours() > 0) {
			let timeDiff = currentDateTime.getHours() - lastUpdatedDate.getHours();
			let timeUnit = timeDiff === 1 ? 'hour' : 'hours';
			lastUpdatedMsg = `${currentDateTime.getHours() - lastUpdatedDate.getHours()} ${timeUnit} ago`;
			return lastUpdatedMsg;
		}
		if (currentDateTime.getMinutes() - lastUpdatedDate.getMinutes() > 0) {
			let timeDiff = currentDateTime.getMinutes() - lastUpdatedDate.getMinutes();
			let timeUnit = timeDiff === 1 ? 'min' : 'mins';
			lastUpdatedMsg = `${currentDateTime.getMinutes() - lastUpdatedDate.getMinutes()} ${timeUnit} ago`;
			return lastUpdatedMsg;
		}
		return lastUpdatedMsg;
	};

	setDailyCovidCases = () => {
		let covidData = this.props.covidData;
		const dailyCovidCases = covidData.statewise.find((item) => item.statecode === 'TT');
		if (dailyCovidCases) {
			let lastUpdatedMsg = this.getLastUpdateTime(dailyCovidCases.lastupdatedtime);
			const currentCases = [
				{
					name: 'Confirmed',
					newlyAdded: dailyCovidCases.deltaconfirmed,
					totalCount: dailyCovidCases.confirmed,
					lastUpdatedDate: lastUpdatedMsg,
				},
				{
					name: 'Active',
					newlyAdded: 0,
					totalCount: dailyCovidCases.confirmed - dailyCovidCases.recovered - dailyCovidCases.deaths,
					lastUpdatedDate: lastUpdatedMsg,
				},
				{
					name: 'Recovered',
					newlyAdded: dailyCovidCases.deltarecovered,
					totalCount: dailyCovidCases.recovered,
					lastUpdatedDate: lastUpdatedMsg,
				},
				{
					name: 'Deceased',
					newlyAdded: dailyCovidCases.deltadeaths,
					totalCount: dailyCovidCases.deaths,
					lastUpdatedDate: lastUpdatedMsg,
				},
			];
			this.setState({
				dailyCovidCases: currentCases,
			});
		}
	};

	render() {
		return (
			<div className={TotalCasesStyles.totalcases__container}>
				{this.state.dailyCovidCases.map((item) => (
					<TotalCaseGrid tModel={item} key={item.name} />
				))}
			</div>
		);
	}
}

const mapStateToProps = (state: StoreModel) => {
	return {
		covidData: state.dashboard.covidData,
	};
};

export default connect(mapStateToProps)(TotalCases);
