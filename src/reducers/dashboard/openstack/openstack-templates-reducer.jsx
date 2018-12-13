import {
	FETCH_TEMPLATES_FULFILLED,
	FETCH_TEMPLATES_REJECTED,
	FETCH_TEMPLATE_BY_ID_FULFILLED,
	FETCH_TEMPLATE_BY_ID_REJECTED,
	FETCH_RECOURCES_REJECTED,
	FETCH_RECOURCES_FULFILLED
} from "../../../constants/dashboard/openstack-constants"

export default function reducer(state =
																	{
																		templates: null,
																		templatesDetails: null,
																		recources : null,
																		error: null
																	}
	, action) {
	switch (action.type) {
		case FETCH_TEMPLATES_REJECTED:
		case FETCH_TEMPLATE_BY_ID_REJECTED:
		case FETCH_RECOURCES_REJECTED : {
			return {
				...state,
				error: action.payload
			}
		}
		case FETCH_TEMPLATES_FULFILLED: {
			return {
				...state,
				fetched: true,
				templates: action.payload
			}
		}
		case FETCH_TEMPLATE_BY_ID_FULFILLED: {
			return {
				...state,
				fetched: true,
				templatesDetails : action.payload
			}
		}
		case FETCH_RECOURCES_FULFILLED: {
			return {
				...state,
				fetched: true,
				recources: action.payload
			}
		}
		default: {
			return {...state}
		}
	}
}
