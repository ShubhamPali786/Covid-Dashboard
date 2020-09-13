import { put, takeEvery } from 'redux-saga/effects';
import Axios from '../../AxiosBase';
import { commonActions } from '../actions/common.action';
import { dashboardActions, dashboardActionTypes } from '../actions/DashboardBuilder.actions';

// ES6 generator functions
export function* fetchDataSaga(action: any) {
	const url = 'data.json';
	try {
		yield put(commonActions.setLoading(true));
		const response = yield Axios.get(url);
        yield put(dashboardActions.fetchSuccess(response.data)); // dispatching an action
       yield put(commonActions.setLoading(false));
	} catch (e) {
      console.log(e.response.data.error.message);
	}
}

export function* getCovidData() {
	yield takeEvery(dashboardActionTypes.GET_COVID_DATA, fetchDataSaga);
}
