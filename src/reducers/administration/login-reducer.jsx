import {LOGIN_FULFILLED, LOGIN_REJECTED} from "../../constants/administration/user-constants"

export default function reducer(state =
																	{
																		resp: null,
																		done: false
																	}
	, action) {
	switch (action.type) {
		case LOGIN_REJECTED: {
			return {
				...state,
				error: action.payload,
				done: false
			}
		}
		case LOGIN_FULFILLED: {
			return {
				...state,
				done: true,
				resp: action.payload
			}
		}
		default: {
			return {...state}
		}
	}
}
