import { FETCH_SERVER_BY_ID_FULFILLED, FETCH_SERVER_BY_ID_REJECTED} from "../../../constants/dashboard/openstack-constants"

export default function reducer(state =
																	{
																		server: null,
																		fetched: false,
																		error: null
																	}
	, action) {
	switch (action.type) {
		case FETCH_SERVER_BY_ID_REJECTED: {
			return {...state,
				error: action.payload}
		}
		case FETCH_SERVER_BY_ID_FULFILLED: {
			return {
				...state,
				fetched: true,
				server: action.payload
			}
		}
		default: {
			return {...state}
		}
	}
}
