import {TRAIN_NEURAL_NETWROK_REJECTED, TRAIN_NEURAL_NETWROK_FULFILLED} from "../../constants/n2sky/n2sky-constants"

export default function reducer(state =
																	{
																		success: null,
																		done: false
																	}
	, action) {
	switch (action.type) {
		case TRAIN_NEURAL_NETWROK_REJECTED: {
			return {
				...state,
				error: action.payload,
				done: false
			}
		}
		case TRAIN_NEURAL_NETWROK_FULFILLED: {
			return {
				...state,
				done: true,
				success: action.payload
			}
		}
		default: {
			return {...state}
		}
	}
}
