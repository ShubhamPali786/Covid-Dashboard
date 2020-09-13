import React from 'react';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import { StoreModel } from '../store/reducers';
import { dashboardActions } from '../store/actions/DashboardBuilder.actions';
import TotalCases from './TotalCases/TotalCases';
import { BaseProps } from '../shared/BaseProps/BaseProps';
import DataSpreadBuilder from './DataSpreadBuilder/DataSpreadBuilder';
import StateCovidDataTableBuilder from './StateCovidTableBuilder/StateCovidDataTableBuilder';
import DashboardBuilderStyles from './DashboardBuilder.module.css';
import StateCovidChartBuilder from './StateCovidChartBuilder/StateCovidChartBuilder';
import withLoader from '../HOC/LoaderHoc';

 
interface DashboardProps extends BaseProps {
	fetchData: () => void;
}

interface DashboardStates {
	isDataLoaded: Boolean;
}

class DashboardBuilder extends React.Component<DashboardProps, DashboardStates> {
	

	componentDidMount() {
		this.props.fetchData();
	}
	

	render() {
		if (this.props.covidData) {
			return (
				<>
					<TotalCases />
					<DataSpreadBuilder />
					<div className={DashboardBuilderStyles.statewise_component}>
						<StateCovidDataTableBuilder />
						<StateCovidChartBuilder />
					</div>
				</>
			); 
		}
		return null;
	}
}
const mapStoreDataToProps = (state: StoreModel) => {
	return {
		covidData: state.dashboard.covidData,
	};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
		fetchData: () => {
			dispatch(dashboardActions.fetchCovidData());
		},
	};
};
export default compose(withLoader, connect(mapStoreDataToProps, mapDispatchToProps))(DashboardBuilder);
