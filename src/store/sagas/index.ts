//monitor all sagas of application

import { all } from "redux-saga/effects";
import { getCovidData } from "./dashboard-saga";
import { getTimeSeriesData } from "./StateCovidChartBuilder-saga";
import { getStateCovidData } from "./StateCovidTableBuilder-saga";

export default function* rootSaga(){
    yield all([getCovidData(),getStateCovidData(),getTimeSeriesData()])
}