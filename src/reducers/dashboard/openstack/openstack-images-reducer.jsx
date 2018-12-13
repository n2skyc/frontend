import { FETCH_IMAGES_REJECTED, FETCH_IMAGES_FULFILLED} from "../../../constants/dashboard/openstack-constants"

export default function reducer(state =
																	{
																		fetched: false,
																		error: null,
																		images: null
																	}
	, action) {
	switch (action.type) {
		case FETCH_IMAGES_REJECTED: {
			return {...state,
				error: action.payload}
		}
		case FETCH_IMAGES_FULFILLED: {
			return {
				...state,
				fetched: true,
				images: action.payload
			}
		}
		default: {
			return {...state}
		}
	}
}
