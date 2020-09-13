import React, { SyntheticEvent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { StateCovidChartModel } from '../../models/StateCovidChart-Models';
import { BaseProps } from '../../shared/BaseProps/BaseProps';
import { StoreModel } from '../../store/reducers';
import { StateCovidChartActions } from '../../store/actions/StateCovidChartBuilder.actions';
import ChartControls from '../../components/StateCovidChartComponents/ChartControls';
import StateChart from '../../components/StateCovidChartComponents/StateChart';
import StateCovidChartStyles from './StateCovidChartBuilder.module.css';

interface StateCovidChartBuilderProps extends BaseProps {
	stateCovidChartModel: StateCovidChartModel;
	prepareChartDataModel: () => void;
	dropdownChangeHandler: (statecode: string) => void;
	densityTypeClickHandler: (densityType: string) => void;
	checkboxChangeHandler: (e: any) => void;
}

class StateCovidChartBuilder extends React.Component<StateCovidChartBuilderProps, {}> {
	componentDidMount() {
		this.props.prepareChartDataModel();
	}

	render() {
		return (
			this.props.stateCovidChartModel?.state_code ? (
				<div className={StateCovidChartStyles.container}>
					<ChartControls
						dropDownChangeHndl={this.props.dropdownChangeHandler}
						densityTypeClickHandl={this.props.densityTypeClickHandler}
						BuildControlsMeta={this.props.stateCovidChartModel.buildControlsMeta}
						StateDropDownList={this.props.stateCovidChartModel.stateDropDownList}
						DensityClasses={this.props.stateCovidChartModel.densityClass}
						checkboxChangeHandler={this.props.checkboxChangeHandler}
					/>
					<StateChart data={this.props.stateCovidChartModel.datasets} />
				</div>
			):
			<div className={StateCovidChartStyles.loaderSpace}>
				<p>Loading...</p>
			</div>
		);
	}
}

const mapStatetoProps = (store: StoreModel) => {
	return {
		stateCovidChartModel: store.stateChart.stateCovidChartModel,
		covidData: store.dashboard.covidData,
	};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
		prepareChartDataModel: () => {
			dispatch(StateCovidChartActions.initChartData());
		},
		dropdownChangeHandler: (statecode: string) => {
			dispatch(StateCovidChartActions.updateStateChartByStateCode(statecode));
		},
		densityTypeClickHandler: (densityType: string) => {
			dispatch(StateCovidChartActions.updateStateChartByDensity(densityType));
		},
		checkboxChangeHandler:(e:any)=>{
			let checkboxName = e.currentTarget.name;
			let checked = e.currentTarget.checked
			dispatch(StateCovidChartActions.updateStateChartByCheckbox(checkboxName,checked))
		}
	};
};

export default connect(mapStatetoProps, mapDispatchToProps)(StateCovidChartBuilder);
