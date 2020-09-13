import { CovidDataModel } from "../../models/covidData-Model";

export const dashboardActionTypes = {
	GET_COVID_DATA: '[Dashboard] Get Initial Covid Data',
	GET_COVID_DATA_SUCCESS: '[Dashboard] Get Initial Covid Data Success',
};

const fetchCovidData = () => {
	return {
		type: dashboardActionTypes.GET_COVID_DATA,
	};
};
const fetchSuccess = (covidData: object) => {
	return {
		type: dashboardActionTypes.GET_COVID_DATA_SUCCESS,
		covidData,
	};
};

export const dashboardActions = { fetchCovidData, fetchSuccess };
