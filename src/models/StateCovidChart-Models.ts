import { CovidDataModel } from "./covidData-Model";

export interface StateCovidChartModel{

    
		datasets: object,
		
		state_code: string,
		state_timeseries_data: any[],
		densityClass: {
			cumulative: string,
			daily: string,
		},
		stateDropDownList: {
            state:string,
            statecode:string,
            selected:boolean
        }[],
		buildControlsMeta: {
            name: string,
                        checked: boolean,
                        labeltxt: string
		}[],
		covidData:CovidDataModel
	
}

export interface BuildControlsModel{
    name: string,
				checked: boolean,
				labeltxt: string
}

export interface StateChartModel{
	labels:string,
	delta: {
		labels: string,
		confirmed: number[],
		recovered: number[],
		deceased: number[],
		tested: number[],
	},
	confirmed: number[],
	recovered: number[],
	deceased: number[],
	tested: number[],
}