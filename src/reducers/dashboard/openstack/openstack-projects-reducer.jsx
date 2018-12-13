import { FETCH_OPENSTACK_PROJECTS_FULFILLED, FETCH_OPENSTACK_PROJECTS_REJECTED} from "../../../constants/dashboard/openstack-constants"

export default function reducer(state =
																	{
																		fetched: false,
																		error: null
																	}
	, action) {
	switch (action.type) {
		case FETCH_OPENSTACK_PROJECTS_REJECTED: {
			return {...state,
								error: action.payload}
		}
		case FETCH_OPENSTACK_PROJECTS_FULFILLED: {
			return {
				...state,
				fetched: true,
				projects: action.payload
			}
		}
		default: {
			return {...state}
		}
	}
}
