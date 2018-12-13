import {REGISTRATION_REJECTED, REGISTRATION_FULFILLED} from "../../constants/administration/user-constants"

export default function reducer(state =
																	{
																		resp: null,
																		done: false
																	}
	, action) {
	switch (action.type) {
		case REGISTRATION_REJECTED: {
			return {
				...state,
				error: action.payload,
				done: false
			}
		}
		case REGISTRATION_FULFILLED: {
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
