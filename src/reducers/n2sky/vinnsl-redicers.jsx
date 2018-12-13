import {
	CREATE_VINNSL_DESCRIPTION_REJECTED,
	CREATE_VINNSL_DESCRIPTION_FULFILLED
} from "../../constants/n2sky/n2sky-constants"

export function vinnslCreate(state =
															 {
																 vinnsl: null,
																 done: false
															 }
	, action) {
	switch (action.type) {
		case CREATE_VINNSL_DESCRIPTION_REJECTED: {
			return {
				...state,
				error: action.payload,
				done: false
			}
		}
		case CREATE_VINNSL_DESCRIPTION_FULFILLED: {
			return {
				...state,
				done: true,
				vinnsl: action.payload
			}
		}
		default: {
			return {...state}
		}
	}
}
