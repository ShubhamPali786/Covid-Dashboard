import { StateModel } from './covidData-Model';

export interface DistrictModel {
	statecode: string;
	active: number;
	confirmed: number;
	deceased: number;
	recovered: number;
	delta: {
		confirmed: number;
		deceased: number;
		recovered: number;
	};
	districtName: any;
	zone: any;
}
export interface ZoneModel {
	district: string;
	districtcode: string;
	lastupdated: string;
	state: string;
	statecode: string;
	zone: string;
}

export interface StateDataModel {
	stateModel: StateModel;
	Is_Highlighted: Boolean;
	ZoneData: ZoneModel[];
	DistrictData: DistrictModel[];
}
