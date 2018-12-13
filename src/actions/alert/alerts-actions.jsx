import axios from "axios"

import {ALERTING_API} from "../../restclient/abstract-rest-client"

import {
	FETCH_ALERT_DATA_FULFILLED, FETCH_ALERT_DATA_REJECTED
} from "../../constants/alert/alert-constants"

export function getAlerts() {
	return function (dispatch) {
		return axios.get(ALERTING_API)
			.then((res) => {
				dispatch({type: FETCH_ALERT_DATA_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: FETCH_ALERT_DATA_REJECTED, payload: err})
			})
	}
}
