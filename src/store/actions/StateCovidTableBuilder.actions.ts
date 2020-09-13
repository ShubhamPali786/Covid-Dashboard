import { CovidDataModel } from '../../models/covidData-Model';
import { DistrictModel, ZoneModel } from '../../models/State-Models';
import appStore from '..';
import { stateCovidTableActionTypes } from '../reducers';






const getDistrictCovidData = (covidData:CovidDataModel) => {
	return {
        type: stateCovidTableActionTypes.GET_DISTRICT_COVID_DATA,
        covidData
	};
};

const getZonesData = (districtData: DistrictModel[],covidData:CovidDataModel) => {
	return {
		type: stateCovidTableActionTypes.GET_DISTRICT_ZONES_DATA,
		districtData,covidData
	};
};

const prepareStateModelCollection = (districtData: DistrictModel[], zonesData: ZoneModel[]
    ,covidData:CovidDataModel) => {
	return {
		type: stateCovidTableActionTypes.PREPARE_STATE_COVIDMODEL_COLLECTION,
		covidData: appStore.getState().dashboard.covidData,
        districtData,
        zonesData
	};
};

const hightlightSelectedState = (stateCode:string)=>{
	return{
		type:stateCovidTableActionTypes.HIGHLIGHT_SELECTED_STATE,
		stateCode
	}
}

export const StateCovidTableActions = { getDistrictCovidData, getZonesData, prepareStateModelCollection,hightlightSelectedState };
