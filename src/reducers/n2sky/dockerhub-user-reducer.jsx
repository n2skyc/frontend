import {GET_DOCKERHUB_USER_REJECTED, GET_DOCKERHUB_USER_FULFILLED} from "../../constants/n2sky/dockerhub-constants"

export default function reducer(state =
																	{
																		dockerHubUser: null,
																		done: false
																	}
	, action) {
	switch (action.type) {
		case GET_DOCKERHUB_USER_REJECTED: {
			return {
				...state,
				error: action.payload,
				done: false
			}
		}
		case GET_DOCKERHUB_USER_FULFILLED: {
			return {
				...state,
				done: true,
				dockerHubUser: action.payload
			}
		}
		default: {
			return {...state}
		}
	}
}
