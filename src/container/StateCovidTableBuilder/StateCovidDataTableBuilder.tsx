import React from 'react';
import { BaseProps } from '../../shared/BaseProps/BaseProps';
import { StoreModel } from '../../store/reducers';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import Axios from '../../AxiosBase';
import { DistrictModel, ZoneModel, StateDataModel } from '../../models/State-Models';
import StateCovidComponent from '../../components/StateCovidTableComponent/StateCovidTableComponent';
import { StateCovidTableActions } from '../../store/actions/StateCovidTableBuilder.actions';
import { CovidDataModel } from '../../models/covidData-Model';
import { StateCovidChartActions } from '../../store/actions/StateCovidChartBuilder.actions';
import withLoader from '../../HOC/LoaderHoc';

interface StateCovidDataProps extends BaseProps {
	StateDataModelCollection:StateDataModel[]
	getDistrictCovidData: (covidData:CovidDataModel) => void;
	displayStateDetails:(stateCode:string) =>void;
	changeStateChartOnHover:(stateCode:string)=>void;
}

interface StateCovidDataState {
	
}

class StateCovidDataTableBuilder extends React.Component<StateCovidDataProps, StateCovidDataState> {
	

	componentDidMount() {
		let covidData = {...this.props.covidData}
		this.props.getDistrictCovidData(covidData)
	}

	render() {
		return (
			this.props.StateDataModelCollection.length > 0 && (
				<StateCovidComponent
					onHoverHandler={this.props.changeStateChartOnHover}
					StateDataModelCollection={this.props.StateDataModelCollection}
					DisplayStateSpread={this.props.displayStateDetails}
				/>
			)
		);
	}
}

const mapStateToProps = (state: StoreModel) => {
	return {
		covidData: state.dashboard.covidData,
		StateDataModelCollection:state.stateTable.StateDataModelCollection
	};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
		getDistrictCovidData: (covidData:CovidDataModel) => {
			dispatch(StateCovidTableActions.getDistrictCovidData(covidData));
		},
		displayStateDetails:(stateCode:string)=>{
			dispatch(StateCovidTableActions.hightlightSelectedState(stateCode))
		},
		changeStateChartOnHover:(statecode:string)=>{
			dispatch(StateCovidChartActions.updateStateChartByStateCode(statecode))
		}
	};
};

export default compose(withLoader,connect(mapStateToProps,mapDispatchToProps))(StateCovidDataTableBuilder);
