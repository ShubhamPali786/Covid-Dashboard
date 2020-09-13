import { combineReducers } from 'redux';
import dashbordReducer from './DashboardBuilder.reducer';
import { CovidDataModel } from '../../models/covidData-Model';
import { StateDataModel } from '../../models/State-Models';
import stateTableReducer from './StateCovidTableBuilder.reducer';
import stateCovidChartReducer from './StateCovidChartBuilder.reducer';
import { StateCovidChartModel } from '../../models/StateCovidChart-Models';
import commonReducer from './common.reducer';

export interface StoreModel {
	dashboard: { covidData: CovidDataModel };
	stateTable:{
		StateDataModelCollection:StateDataModel[]
	},
	stateChart:{
		stateCovidChartModel:StateCovidChartModel
	}
	loading:boolean
}

export const stateCovidTableActionTypes = {
	GET_DISTRICT_COVID_DATA: '[STATECOVIDTABLE] GET DISTRICT COVID DATA',
	GET_DISTRICT_ZONES_DATA: '[STATECOVIDTABLE] GET DISTRICT ZONE DATA',
	PREPARE_STATE_COVIDMODEL_COLLECTION: '[STATECOVIDTABLE] SET State Covid Data Model Collection',
	HIGHLIGHT_SELECTED_STATE:'[STATECOVIDTABLE] Highlight selected state'
};

export const StateCovidChartActionTypes ={
	GET_TIMESERIES_DATA:'[StateCovidChart] Get Time series Covid Data',
	PREPARE_CHART_MODEL:'[StateCovidChart] Prepare Covid Chart Model',
	UPDATE_STATE_CHART:'[StateCovidChart] Update State Chart by state code',
	UPDATE_DENSITY_TYPE:'[StateCovidChart] Update State Chart by density Type',
	CHECKBOX_CHANGE:'[StateCovidChart] Update State Chart by Checked Box'
};


const rootReducer = combineReducers({ dashboard: dashbordReducer,stateTable:stateTableReducer,stateChart:stateCovidChartReducer,loading:commonReducer });





export default rootReducer;
