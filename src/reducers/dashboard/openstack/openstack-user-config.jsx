import {FETCH_OPENSTACK_USER_CONFIG_FULFILLED, FETCH_OPENSTACK_USER_CONFIG_REJECTED } from "../../../constants/dashboard/monitoring-constants"

export default function reducer(state =
																	{
																		fetched: false,
																		error: null
																	}
	, action) {
	switch (action.type) {
		case FETCH_OPENSTACK_USER_CONFIG_REJECTED: {
			return {...state,
				error: action.payload}
		}
		case FETCH_OPENSTACK_USER_CONFIG_FULFILLED: {
			return {
				...state,
				fetched: true,
				config: action.payload
			}
		}
		default: {
			return {...state}
		}
	}
}
