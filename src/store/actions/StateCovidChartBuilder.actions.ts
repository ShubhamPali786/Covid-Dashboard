import appStore from '..';
import { StateCovidChartActionTypes } from '../reducers';

const initChartData = () => {
	return {
		type: StateCovidChartActionTypes.GET_TIMESERIES_DATA,
	};
};

const prepareCovidChartData = (state_timeseries_data: any) => {
	return {
		type: StateCovidChartActionTypes.PREPARE_CHART_MODEL,
		state_timeseries_data,
		covidData: appStore.getState().dashboard.covidData,
	};
};

const updateStateChartByStateCode = (stateCode: string) => {
	return {
		type: StateCovidChartActionTypes.UPDATE_STATE_CHART,
		stateCode,
	};
};

const updateStateChartByDensity = (densityType: string) => {
	return {
		type: StateCovidChartActionTypes.UPDATE_DENSITY_TYPE,
		densityType,
	};
};
const updateStateChartByCheckbox = (checkboxName: string, checked: boolean) => {
	return {
		type: StateCovidChartActionTypes.CHECKBOX_CHANGE,
		checkboxName,
		checked,
	};
};

export const StateCovidChartActions = {
	initChartData,
	prepareCovidChartData,
	updateStateChartByStateCode,
	updateStateChartByDensity,
	updateStateChartByCheckbox,
};
