import { Action } from 'redux';
import { dashboardActionTypes } from '../actions/DashboardBuilder.actions';
import { CovidDataModel } from '../../models/covidData-Model';

interface DashboardActions extends Action {
	covidData?: CovidDataModel;
}

export const initialState = {
	covidData: null,
};

function dashbordReducer(state = initialState, action: DashboardActions):any {
	switch (action.type) {
		case dashboardActionTypes.GET_COVID_DATA_SUCCESS:
            return { covidData: action.covidData };
        default:
            return state;
	}
}
export default dashbordReducer;
