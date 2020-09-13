export interface DailyCasesModel {
	dailyConfirmed: number[];
	dailyDeath: number[];
	dailyRecovered: number[];
	totalconfirmed: number[];
	totaldeceased: number[];
	totalrecovered: number[];
	date: string[];
}

export interface MonthlySpreadModel {
	month: string;
	monthlyConfirmed: number;
	monthlyDeaths: number;
	monthlyRecovered: number;
}
export interface MonthlyDataModel {
	months: string[];
	confirmed: number[];
	recovered: number[];
	deaths: number[];
}
export interface WeeklyDataModel{
    label:string[],
    data:{
        weeklyConfirmed:number[],
        weeklyRecovered:number[],
        weeklyDeaths:number[]
    },
    name:string
}

export interface ChartModel{
	chartType:string,
	dataset:{},
	chartName:string,
	classes:string
}
