import { takeEvery, put } from "redux-saga/effects";
import {  StateCovidTableActions } from "../actions/StateCovidTableBuilder.actions";
import axiosInstance from "../../AxiosBase";
import { DistrictModel, ZoneModel } from "../../models/State-Models";
import { stateCovidTableActionTypes } from "../reducers";
import { commonActions } from "../actions/common.action";


export function* fetchDistrictData(action: any) {
	const url = 'state_district_wise.json';
	try {
        const response = yield axiosInstance.get(url);
        let districtdataModel: DistrictModel[] = Object.values(response.data);
        yield put(StateCovidTableActions.getZonesData(districtdataModel,action.covidData)); // dispatching an action
       
	} catch (e) {
      console.log(e.response.data.error.message);
	}
}

export function* fetchDistrictZoneData(action: any) {
    const url ='zones.json';


    try {
        const response = yield axiosInstance.get(url);
        let zoneDataCollection: ZoneModel[] = response.data.zones;
        yield put(StateCovidTableActions.prepareStateModelCollection(action.districtData,zoneDataCollection,action.covidData)); // dispatching an action
       
    } catch (error) {
        console.log(error.response.data.error.message);
    }

}






export function* getStateCovidData() {
    yield takeEvery(stateCovidTableActionTypes.GET_DISTRICT_COVID_DATA, fetchDistrictData);
    yield takeEvery(stateCovidTableActionTypes.GET_DISTRICT_ZONES_DATA,fetchDistrictZoneData);
    
}