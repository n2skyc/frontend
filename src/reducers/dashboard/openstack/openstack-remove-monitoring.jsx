import { REMOVE_OPENSTACK_MONITORING_CONFIG_REJECTED, REMOVE_OPENSTACK_MONITORING_CONFIG_FULFILLED} from "../../../constants/dashboard/monitoring-constants"

export default function reducer(state =
																	{
																		removed: false,
																		error: null
																	}
	, action) {
	switch (action.type) {
		case REMOVE_OPENSTACK_MONITORING_CONFIG_REJECTED: {
			return {...state,
				error: action.payload}
		}
		case REMOVE_OPENSTACK_MONITORING_CONFIG_FULFILLED: {
			return {
				...state,
				removed: true,
				project: action.payload
			}
		}
		default: {
			return {...state}
		}
	}
}
