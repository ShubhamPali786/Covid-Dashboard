import {Action} from 'redux';
import { CovidDataModel } from '../../models/covidData-Model';
import { DistrictModel, ZoneModel, StateDataModel } from '../../models/State-Models';
import { stateCovidTableActionTypes } from '.';



interface StateCovidTableActions extends Action {
    covidData: CovidDataModel,
    districtData:DistrictModel[],
    zonesData:ZoneModel[],
    stateCode:string
}

export const initialState = {
    StateDataModelCollection:[],
    
};




function stateTableReducer(state = initialState, action: StateCovidTableActions):any {

	switch (action.type) {
		case stateCovidTableActionTypes.PREPARE_STATE_COVIDMODEL_COLLECTION:
            return {StateDataModelCollection:createStateDataModel(action.zonesData,action.districtData,action.covidData)};
        
        case stateCovidTableActionTypes.HIGHLIGHT_SELECTED_STATE:
            return{
                StateDataModelCollection:updateStateDataModelCollection(action.stateCode,state.StateDataModelCollection)
            }

        default: 
            return state;
	}
}
const updateStateDataModelCollection = (stateCode: string,StateDataModelCollection:StateDataModel[]) => {
    let stateModelCollection =[...StateDataModelCollection];

    let oldHighlightedState = stateModelCollection.find((item) => item.Is_Highlighted === true);
    if (oldHighlightedState) {
    	let index = stateModelCollection.findIndex(
    		(item) => item.stateModel.statecode === oldHighlightedState?.stateModel.statecode
    	);
    	oldHighlightedState.Is_Highlighted = false;
    	stateModelCollection[index] = oldHighlightedState;
    }
    if (oldHighlightedState?.stateModel.statecode !== stateCode) {
    	let stateDataModel: StateDataModel = stateModelCollection.find(
    		(item) => item.stateModel.statecode === stateCode
    	)!;

    	stateDataModel.Is_Highlighted = stateDataModel.Is_Highlighted ? false : true;
    	let index = stateModelCollection.findIndex(
    		(item) => item.stateModel.statecode === stateDataModel.stateModel.statecode
    	)!;
    	stateModelCollection[index] = stateDataModel;
    }
    return stateModelCollection;
};


  

const createStateDataModel = (zoneDataCollection: ZoneModel[], districtdataModelCollection: DistrictModel[],covidData:CovidDataModel) => {
    let stateDataModelCollection: StateDataModel[] = [];

   covidData.statewise.forEach((item) => {
        if (!['TT', 'UN', 'DN'].includes(item.statecode)) {
            let zoneModel: ZoneModel[] = zoneDataCollection.filter((zone) => zone.statecode === item.statecode);
            let districtData: DistrictModel;
            districtData = districtdataModelCollection.find((district) => district.statecode === item.statecode)!;

            let stateDataModel: StateDataModel = {
                stateModel: item,
                ZoneData: zoneModel,
                DistrictData: updateDistrictModel(districtData, zoneModel),
                Is_Highlighted: false,
            };
            stateDataModelCollection.push(stateDataModel);
        }
    });
    return stateDataModelCollection;
    
}

    const updateDistrictModel = (districtModel: any, zoneModel: ZoneModel[]) => {
		let districtNames = Object.keys(districtModel.districtData);
		let districtCollection: DistrictModel[] = [];
		districtNames.forEach((district) => {
			if (district !== 'Other State') {
				districtModel.districtData.districtName = district;
				let zone = (zoneModel.find((item) => item.district.toLowerCase() === district.toLowerCase())
					? zoneModel.find((item) => item.district.toLowerCase() === district.toLowerCase())?.zone
					: ' ')!;
				districtCollection.push({
					...districtModel.districtData[district],
					districtName: district,
					zone: zone,
				});
			}
		});
		return districtCollection;
	};
  
    

export default stateTableReducer;
