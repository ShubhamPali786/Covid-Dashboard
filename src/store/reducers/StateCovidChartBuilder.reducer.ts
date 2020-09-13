import { stat } from 'fs';
import { Action } from 'redux';
import { StateCovidChartActionTypes } from '.';
import StateChart from '../../components/StateCovidChartComponents/StateChart';
import { prepareDailyDataset } from '../../container/DataSpreadBuilder/DataSpreadBuilderHelper';
import { CovidDataModel } from '../../models/covidData-Model';
import { BuildControlsModel, StateChartModel, StateCovidChartModel } from '../../models/StateCovidChart-Models';
import { convertObjectToArray, sortArraybyProperty } from '../../shared/HelperMethods/Helper';
import { StateCovidTableActions } from '../actions/StateCovidTableBuilder.actions';

interface StateCovidChartAction extends Action {
	covidData: CovidDataModel;
	state_timeseries_data: [];
	stateCode: string;
	densityType: string;
	checkboxName: string;
	checked: boolean;
}

interface StateCovidChartState {
	stateCovidChartModel: StateCovidChartModel;
}

const initialState: StateCovidChartState = {
	stateCovidChartModel: {
		covidData: { cases_time_series: [], statewise: [], tested: [] },
		datasets: {},
		stateDropDownList: [
			{
				selected: false,
				state: '',
				statecode: '',
			},
		],
		state_code: '',
		state_timeseries_data: [],
		densityClass: {
			cumulative: '',
			daily: 'control_active',
		},
		buildControlsMeta: [
			{
				name: 'confirmed',
				checked: true,
				labeltxt: 'Confirmed',
			},
			{
				name: 'recovered',
				checked: true,
				labeltxt: 'Recovered',
			},
			{
				name: 'deceased',
				checked: true,
				labeltxt: 'Deceased',
			},
			{
				name: 'tested',
				checked: false,
				labeltxt: 'Tested',
			},
		],
	},
};

function stateCovidChartReducer(state = initialState, action: StateCovidChartAction) {
	switch (action.type) {
		case StateCovidChartActionTypes.PREPARE_CHART_MODEL:
			let updatedStateModel = prepareStateChartModel(
				state.stateCovidChartModel,
				action.covidData,
				action.state_timeseries_data
			);
			return { stateCovidChartModel: updatedStateModel };
		case StateCovidChartActionTypes.UPDATE_STATE_CHART:
			let stateChartModel = updateStateChartByStateCode(action.stateCode, state.stateCovidChartModel);
			return {
				stateCovidChartModel: stateChartModel,
			};
		case StateCovidChartActionTypes.UPDATE_DENSITY_TYPE:
			return {
				stateCovidChartModel: updateDensityType(action.densityType, state.stateCovidChartModel),
			};
		case StateCovidChartActionTypes.CHECKBOX_CHANGE:
			return {
				stateCovidChartModel: updateBuildControlsMeta(
					action.checkboxName,
					action.checked,
					state.stateCovidChartModel
				),
			};
		default:
			return state;
	}
}

const updateBuildControlsMeta = (checkboxName: string, checked: boolean, stateChartModel: StateCovidChartModel) => {
	if (!stateChartModel.state_code) return;
	let updatedStateModel = { ...stateChartModel };
	let activeObj: BuildControlsModel = updatedStateModel.buildControlsMeta.find((item) => item.name === checkboxName)!;
	activeObj.checked = checked;
	let index = updatedStateModel.buildControlsMeta.findIndex((item) => item.name === checkboxName);
	let buildControlsMeta = [...updatedStateModel.buildControlsMeta];
	buildControlsMeta[index] = activeObj;
	updatedStateModel.buildControlsMeta = buildControlsMeta;
	updatedStateModel.datasets = updateDataSets(updatedStateModel.state_code, updatedStateModel);
	return updatedStateModel;
};

const updateDensityType = (densityType: string, stateCovidChartModel: StateCovidChartModel) => {
	let updateStateModel = { ...stateCovidChartModel };
	if (densityType === 'daily') {
		updateStateModel.densityClass = {
			cumulative: '',
			daily: 'control_active',
		};
		updateStateModel.datasets = updateDataSets(updateStateModel.state_code, updateStateModel);
	} else {
		updateStateModel.densityClass = {
			cumulative: 'control_active',
			daily: '',
		};
		updateStateModel.datasets = updateDataSets(updateStateModel.state_code, updateStateModel);
	}
	return updateStateModel;
};

const updateStateChartByStateCode = (statecode: string, StateChartModel: StateCovidChartModel) => {
	let updatedStateModel = { ...StateChartModel };
	if (statecode) {
		if (updatedStateModel.stateDropDownList.findIndex((item) => item.statecode === statecode) === -1) return;
	}

	let stateDropDownList = [...updatedStateModel.stateDropDownList];
	stateDropDownList.forEach((item) => {
		if (item.statecode === statecode) item.selected = true;
		else item.selected = false;
	});
	updatedStateModel.state_code = statecode;
	updatedStateModel.stateDropDownList = stateDropDownList;
	updatedStateModel.datasets = updateDataSets(statecode, updatedStateModel);

	return updatedStateModel;
};

const prepareStateChartModel = (
	initialState: StateCovidChartModel,
	covidData: CovidDataModel,
	state_timeseries_data: []
) => {
	let stateChartModel: StateCovidChartModel = { ...initialState };
	stateChartModel.state_code = 'TT';
	stateChartModel.state_timeseries_data = state_timeseries_data;
	stateChartModel.covidData = covidData;
	stateChartModel.stateDropDownList = setStateDropdownList(state_timeseries_data, covidData);
	stateChartModel.datasets = updateDataSets(stateChartModel.state_code, stateChartModel);

	return stateChartModel;
};

const updateDataSets = (stateCode: string, stateChartModel: StateCovidChartModel) => {
	let displayDensity = stateChartModel.densityClass.daily ? 'daily' : 'cumulative';
	let activeCheckbox = stateChartModel.buildControlsMeta.filter((item) => item.checked);
	let datasets = prepareDataSet(stateCode, displayDensity, activeCheckbox, stateChartModel);
	return datasets;
};

const prepareDataSet = (
	statecode: string,
	displayDensity: string,
	filters: BuildControlsModel[],
	stateChartModel: StateCovidChartModel
) => {
	let stateObj = prepareData(statecode, stateChartModel);
	let stateupdateObj = displayDensity === 'daily' ? stateObj.delta : stateObj;
	let datasets: any[] = [];
	let dataObj = {};
	let dataset = {};
	filters.forEach((item) => {
		switch (item.name) {
			case 'confirmed':
				dataObj = {
					label: 'Confirmed Cases',
					backgroundColor: '#FFE0E6',
					hoverBackgroundColor: '#FF073A',
					hoverBorderColor: 'white',
					borderColor: '#FF073A',
					data: [...stateupdateObj.confirmed],
				};
				dataset = createDataSet(dataObj);
				datasets.push(dataset);
				break;
			case 'recovered':
				dataObj = {
					label: 'Recoverd Cases',
					backgroundColor: '#28a745',
					hoverBackgroundColor: '#28a745',
					hoverBorderColor: '#28a745',
					borderColor: '#28a745',
					data: [...stateupdateObj.recovered],
				};
				dataset = createDataSet(dataObj);
				datasets.push(dataset);
				break;
			case 'deceased':
				dataObj = {
					label: 'Deceased Cases',
					backgroundColor: '#6c757d',
					hoverBackgroundColor: '#6c757d',
					hoverBorderColor: 'white',
					borderColor: '#6c757d',
					data: [...stateupdateObj.deceased],
				};
				dataset = createDataSet(dataObj);
				datasets.push(dataset);
				break;
			case 'tested':
				dataObj = {
					label: 'Tested Patients',
					backgroundColor: 'white',
					hoverBackgroundColor: '#1CBFD4',
					hoverBorderColor: 'white',
					borderColor: '#1CBFD4',
					data: [...stateupdateObj.tested],
				};
				dataset = createDataSet(dataObj);
				datasets.push(dataset);
				break;
			default:
				break;
		}
	});
	let state_chart_data = {
		labels: stateupdateObj.labels,
		datasets: datasets,
	};

	return state_chart_data;
};
const createDataSet = (dataObj: any) => {
	return {
		label: dataObj.label,
		lineTension: 0.5,
		backgroundColor: dataObj.backgroundColor,
		hoverBackgroundColor: dataObj.hoverBackgroundColor,
		hoverBorderColor: dataObj.hoverBorderColor,
		borderColor: dataObj.borderColor,
		borderWidth: 1,
		data: dataObj.data,
		pointRadius: 2,
		fill: false,
		pointBackgroundColor: 'white',
	};
};
const prepareData = (statecode: string, stateChartModel: StateCovidChartModel) => {
	let labels: string[] = [];
	let daily_confirmed: number[] = [];
	let daily_recover: number[] = [];
	let daily_deceased: number[] = [];
	let daily_tested: number[] = [];
	let confirmed: number[] = [];
	let recovered: number[] = [];
	let deceased: number[] = [];
	let tested: number[] = [];

	let dailyDataSet = prepareDailyDataset(stateChartModel.covidData);

	if (statecode !== 'TT') {
		let state_data = stateChartModel.state_timeseries_data;
		let stateDateObjArr: any[] = convertObjectToArray(
			state_data.find((item) => item.statecode === statecode),
			'recordedDate'
		);

		stateDateObjArr.forEach((item) => {
			if (item.recordedDate) {
				var MONTH = item.recordedDate.split('-')[1];
				if (!['01', '02', '03'].includes(MONTH)) {
					labels.push(getLabel(item.recordedDate));
					if (item.delta) {
						if (item.delta.confirmed) daily_confirmed.push(parseInt(item.delta.confirmed));
						if (item.delta.recovered) daily_recover.push(parseInt(item.delta.recovered));
						if (item.delta.deceased) daily_deceased.push(parseInt(item.delta.deceased));
						if (item.delta.tested) daily_tested.push(parseInt(item.delta.tested));
					}
					if (item.total) {
						if (item.total.confirmed) confirmed.push(parseInt(item.total.confirmed));
						if (item.total.recovered) recovered.push(parseInt(item.total.recovered));
						if (item.total.deceased) deceased.push(parseInt(item.total.deceased));
						if (item.total.tested) tested.push(parseInt(item.total.tested));
					}
				}
			}
		});
	} else {
		labels = dailyDataSet.date;
		daily_confirmed = [...dailyDataSet.dailyConfirmed];
		daily_recover = [...dailyDataSet.dailyRecovered];
		daily_deceased = [...dailyDataSet.dailyDeath];
		confirmed = [...dailyDataSet.totalconfirmed];
		recovered = [...dailyDataSet.totalrecovered];
		deceased = [...dailyDataSet.totaldeceased];
	}
	let stateobj = {
		labels: labels,
		delta: {
			labels: labels,
			confirmed: daily_confirmed,
			recovered: daily_recover,
			deceased: daily_deceased,
			tested: daily_tested,
		},
		confirmed: confirmed,
		recovered: recovered,
		deceased: deceased,
		tested: tested,
	};

	return stateobj;
};

const getLabel = (date_string: string) => {
	let date_str = date_string.split('-');
	date_str.shift();
	return date_str.join('-');
};

const setStateDropdownList = (stateTimeSeriesData: any[], covidModel: CovidDataModel) => {
	let stateData = [...covidModel.statewise];
	let dropDownList = [];

	stateData.forEach((item) => {
		if (item.statecode !== 'TT') {
			if (stateTimeSeriesData.findIndex((stateitem) => stateitem.statecode === item.statecode) !== -1) {
				let dropdownObj = {
					state: item.state,
					statecode: item.statecode,
					selected: false,
				};
				dropDownList.push(dropdownObj);
			}
		}
	});
	dropDownList.push({
		state: 'All State',
		statecode: 'TT',
		selected: true,
	});
	var sortedList = sortArraybyProperty(dropDownList, 'state', true);
	return sortedList;
};

export default stateCovidChartReducer;
