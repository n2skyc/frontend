import {
	FETCH_ALERT_DATA_REJECTED, FETCH_ALERT_DATA_FULFILLED
} from "../../constants/alert/alert-constants"

export function getAlerts(state =
																				 {
																					 alerts: null,
																					 done: false
																				 }
	, action) {
	switch (action.type) {
		case FETCH_ALERT_DATA_REJECTED: {
			return {
				...state,
				error: action.payload,
				done: false
			}
		}
		case FETCH_ALERT_DATA_FULFILLED: {
			return {
				...state,
				done: true,
				alerts: action.payload
			}
		}
		default: {
			return {...state}
		}
	}
}
