import {
	GET_USER_REJECTED, GET_USER_FULFILLED
} from "../../constants/administration/user-constants"

export function getUserByIdentity(state =
																				 {
																					 user: null,
																					 done: false
																				 }
	, action) {
	switch (action.type) {
		case GET_USER_REJECTED: {
			return {
				...state,
				error: action.payload,
				done: false
			}
		}
		case GET_USER_FULFILLED: {
			return {
				...state,
				done: true,
				user: action.payload
			}
		}
		default: {
			return {...state}
		}
	}
}
