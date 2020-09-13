export interface StateModel {
	active: number;
	statecode: string;
	confirmed: number;
	deaths: number;
	deltaconfirmed: number;
	deltadeaths: number;
	deltarecovered: number;
	lastupdatedtime: string;
	migratedother: string;
	recovered: number;
	state: string;
}
export interface TimeseriesModel {
	dailyconfirmed: string;
	dailydeceased: string;
	dailyrecovered: string;
	date: string;
	totalconfirmed: string;
	totaldeceased: string;
	totalrecovered: string;
}

export interface CovidDataModel {
	cases_time_series: TimeseriesModel[];
	statewise: StateModel[];
	tested: [];
}
