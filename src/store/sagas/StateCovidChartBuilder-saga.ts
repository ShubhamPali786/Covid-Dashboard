import axiosInstance from "../../AxiosBase";
import { put, takeEvery } from "redux-saga/effects";
import { convertObjectToArray } from "../../shared/HelperMethods/Helper";
import { StateCovidChartActions } from "../actions/StateCovidChartBuilder.actions";
import { StateCovidChartActionTypes } from "../reducers";


export function* fetchTimeSeriesData(action:any){
    const url = 'v3/min/timeseries.min.json';
    try {
        const response = yield axiosInstance.get(url);
        let state_series_data =  convertObjectToArray(response.data, 'statecode');
        yield put(StateCovidChartActions.prepareCovidChartData(state_series_data)); // dispatching an action
        
    } catch (error) {
        
    }
}


export function* getTimeSeriesData() {
    yield takeEvery(StateCovidChartActionTypes.GET_TIMESERIES_DATA, fetchTimeSeriesData);
    
    
}