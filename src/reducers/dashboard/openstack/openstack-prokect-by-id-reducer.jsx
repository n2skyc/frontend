import { FETCH_OPENSTACK_PROJECT_BY_ID_FULFILLED, FETCH_OPENSTACK_PROJECT_BY_ID_REJECTED} from "../../../constants/dashboard/openstack-constants"

export default function reducer(state =
																	{
																		fetched: false,
																		error: null
																	}
	, action) {
	switch (action.type) {
		case FETCH_OPENSTACK_PROJECT_BY_ID_REJECTED: {
			return {...state,
				error: action.payload}
		}
		case FETCH_OPENSTACK_PROJECT_BY_ID_FULFILLED: {
			return {
				...state,
				fetched: true,
				project: action.payload
			}
		}
		default: {
			return {...state}
		}
	}
}
