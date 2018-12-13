import { FETCH_SERVER_REJECTED, FETCH_SERVER_FULFILLED} from "../../../constants/dashboard/openstack-constants"

export default function reducer(state =
																	{
																		servers: null,
																		fetched: false,
																		error: null
																	}
	, action) {
	switch (action.type) {
		case FETCH_SERVER_REJECTED: {
			return {...state,
				error: action.payload}
		}
		case FETCH_SERVER_FULFILLED: {
			return {
				...state,
				fetched: true,
				servers: action.payload
			}
		}
		default: {
			return {...state}
		}
	}
}
