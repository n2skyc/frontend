import { FETCH_FLAVOR_FULFILLED, FETCH_FLAVOR_REJECTED} from "../../../constants/dashboard/openstack-constants"

export default function reducer(state =
																	{
																		flavor: null,
																		fetched: false,
																		error: null
																	}
	, action) {
	switch (action.type) {
		case FETCH_FLAVOR_REJECTED: {
			return {...state,
				error: action.payload}
		}
		case FETCH_FLAVOR_FULFILLED: {
			return {
				...state,
				fetched: true,
				flavor: action.payload
			}
		}
		default: {
			return {...state}
		}
	}
}
