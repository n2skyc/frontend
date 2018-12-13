import {
	FETCH_MODELS_BY_DESC_ID_REJECTED,
	FETCH_MODELS_BY_DESC_ID_FULFILLED,
	FETCH_MODEL_BY_ID_REJECTED,
	FETCH_MODEL_BY_ID_FULFILLED,
	TEST_NEURAL_NETWROK_FULFILLED,
	TEST_NEURAL_NETWROK_REJECTED,
	FETCH_MODELS_LOGS_REJECTED,
	FETCH_MODELS_LOGS_FULFILLED
} from "../../constants/n2sky/n2sky-constants"

export function modelsByDescId(state =
																				 {
																					 models: null,
																					 done: false
																				 }
	, action) {
	switch (action.type) {
		case FETCH_MODELS_BY_DESC_ID_REJECTED: {
			return {
				...state,
				error: action.payload,
				done: false
			}
		}
		case FETCH_MODELS_BY_DESC_ID_FULFILLED: {
			return {
				...state,
				done: true,
				models: action.payload
			}
		}
		default: {
			return {...state}
		}
	}
}

export function modelById(state =
																 {
																	 model: null,
																	 done: false
																 }
	, action) {
	switch (action.type) {
		case FETCH_MODEL_BY_ID_REJECTED: {
			return {
				...state,
				error: action.payload,
				done: false
			}
		}
		case FETCH_MODEL_BY_ID_FULFILLED: {
			return {
				...state,
				done: true,
				model: action.payload
			}
		}
		default: {
			return {...state}
		}
	}
}

export function trainedModel(state =
														{
															model: null,
															done: false
														}
	, action) {
	switch (action.type) {
		case TEST_NEURAL_NETWROK_REJECTED: {
			return {
				...state,
				error: action.payload,
				done: false
			}
		}
		case TEST_NEURAL_NETWROK_FULFILLED: {
			return {
				...state,
				done: true,
				model: action.payload
			}
		}
		default: {
			return {...state}
		}
	}
}

export function modelLogs(state =
																 {
																	 logs: null,
																	 done: false
																 }
	, action) {
	switch (action.type) {
		case FETCH_MODELS_LOGS_REJECTED: {
			return {
				...state,
				error: action.payload,
				done: false
			}
		}
		case FETCH_MODELS_LOGS_FULFILLED: {
			return {
				...state,
				done: true,
				logs: action.payload
			}
		}
		default: {
			return {...state}
		}
	}
}
