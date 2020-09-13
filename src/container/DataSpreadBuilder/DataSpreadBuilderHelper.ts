import { CovidDataModel } from '../../models/covidData-Model';
import { MonthlySpreadModel, DailyCasesModel, MonthlyDataModel, WeeklyDataModel } from '../../models/DataSpread-Models';



let monthlyCases: MonthlySpreadModel[];
export const prepareDailyDataset = (covidData: CovidDataModel):DailyCasesModel => {
	let daily_overall_cases: DailyCasesModel = {
		dailyConfirmed: [],
		dailyDeath: [],
		dailyRecovered: [],
		totaldeceased: [],
		totalconfirmed: [],
		totalrecovered: [],
		date: [],
	};
	//let monthlyCases: MonthlySpreadModel[] = [];
	monthlyCases =[];
	covidData.cases_time_series.forEach(function (data) {
		let MONTH = data.date.trim().split(' ')[1];
		if (!['January', 'February', 'March'].includes(MONTH)) {
			daily_overall_cases.dailyConfirmed.push(parseInt(data.dailyconfirmed));
			daily_overall_cases.dailyDeath.push(parseInt(data.dailydeceased));
			daily_overall_cases.dailyRecovered.push(parseInt(data.dailyrecovered));
			daily_overall_cases.totalconfirmed.push(parseInt(data.totalconfirmed));
			daily_overall_cases.totaldeceased.push(parseInt(data.totaldeceased));
			daily_overall_cases.totalrecovered.push(parseInt(data.totalrecovered));

			daily_overall_cases.date.push(data.date.trim());

			if (monthlyCases.length > 0) {
				let objectIndex = monthlyCases.findIndex((item) => item.month === MONTH);
				if (objectIndex !== -1) {
					monthlyCases[objectIndex]['monthlyConfirmed'] += parseInt( data.dailyconfirmed);
					monthlyCases[objectIndex]['monthlyDeaths'] +=parseInt( data.dailydeceased);
					monthlyCases[objectIndex]['monthlyRecovered'] += parseInt(data.dailyrecovered);
				} else {
					monthlyCases.push({
						month: MONTH,
						monthlyConfirmed: parseInt( data.dailyconfirmed),
						monthlyDeaths: parseInt( data.dailydeceased),
						monthlyRecovered: parseInt(data.dailyrecovered),
					});
				}
			} else {
				monthlyCases.push({
					month: MONTH,
					monthlyConfirmed: parseInt( data.dailyconfirmed),
					monthlyDeaths: parseInt( data.dailydeceased),
					monthlyRecovered: parseInt(data.dailyrecovered),
				});
			}
		}
	});
    return daily_overall_cases;
	
};

export function PrepareMonthlyDataSet(): MonthlyDataModel {
	let monthlyCasesObj: MonthlyDataModel = {
		confirmed: [],
		deaths: [],
		months: [],
		recovered: [],
	};
	monthlyCases.forEach(function (item, index) {
		if (!monthlyCasesObj.months.includes(item.month)) monthlyCasesObj.months.push(item.month);
		monthlyCasesObj.confirmed.push(item.monthlyConfirmed);
		monthlyCasesObj.deaths.push(item.monthlyDeaths);
		monthlyCasesObj.recovered.push(item.monthlyRecovered);
	});
	return monthlyCasesObj;
}

export const prepareWeeklyDataset=(covidData:CovidDataModel):WeeklyDataModel=>{
		
    let timeseriesdata = [...covidData.cases_time_series]
    let currentWeek = timeseriesdata.slice((timeseriesdata.length-1)-7,(timeseriesdata.length-1));
    let previousWeek = timeseriesdata.slice((timeseriesdata.length-1)-14,(timeseriesdata.length-1)-7);

    let currentWeekConfirmedTotal =currentWeek.reduce(function(acc, obj) { return acc + parseInt(obj.dailyconfirmed); },0);
    let previousWeekConfirmedTotal = previousWeek.reduce(function(acc, obj) { return acc + parseInt(obj.dailyconfirmed); },0);
    
    let currentWeekRecoveredTotal = currentWeek.reduce(function(acc, obj) { return acc + parseInt(obj.dailyrecovered); },0);
    let previousWeekRecoveredTotal = previousWeek.reduce(function(acc, obj) { return acc + parseInt(obj.dailyrecovered); },0);

    let currentWeekDeathsTotal = currentWeek.reduce(function(acc, obj) { return acc + parseInt(obj.dailydeceased); },0);
    let previousWeekDeathsTotal = previousWeek.reduce(function(acc, obj) { return acc + parseInt(obj.dailydeceased); },0);

    
    
    
    let currentWeekLabel = "[ "+currentWeek[0].date.trim() + " - " + currentWeek[currentWeek.length-1].date.trim()+" ]";
    let previousWeekLabel ="[ "+previousWeek[0].date.trim() + " - " + previousWeek[previousWeek.length-1].date.trim()+" ]";

    return {
        label:[previousWeekLabel,currentWeekLabel],
        data:{
        weeklyConfirmed:[previousWeekConfirmedTotal,currentWeekConfirmedTotal],
        weeklyRecovered:[previousWeekRecoveredTotal,currentWeekRecoveredTotal],
        weeklyDeaths:[previousWeekDeathsTotal,currentWeekDeathsTotal]
    },
        name:"weeklyDataset"
    }
}

