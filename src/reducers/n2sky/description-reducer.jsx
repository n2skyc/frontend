import {
	SAVE_DESCRIPTION_REJECTED,
	SAVE_DESCRIPTION_FULFILLED,
	FETCH_DESCRIPTIONS_REJECTED,
	FETCH_DESCRIPTIONS_FULFILLED,
	FETCH_DESCRIPTION_BY_ID_REJECTED,
	FETCH_DESCRIPTION_BY_ID_FULFILLED,
	FETCH_SAVED_DESCRIPTIONS_REJECTED,
	FETCH_SAVED_DESCRIPTIONS_FULFILLED,
	GENERATE_VINNSL_FULFILLED,
	GENERATE_VINNSL_REJECTED
} from "../../constants/n2sky/n2sky-constants"

export function saveDescriptionReducer(state =
																	{
																		success: null,
																		done: false
																	}
	, action) {
	switch (action.type) {
		case SAVE_DESCRIPTION_REJECTED: {
			return {
				...state,
				error: action.payload,
				done: false
			}
		}
		case SAVE_DESCRIPTION_FULFILLED: {
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

export function getDescriptionsReducer(state =
																				 {
																					 descriptions: null,
																					 done: false
																				 }, action) {
	switch (action.type) {
		case FETCH_DESCRIPTIONS_REJECTED: {
			return {
				...state,
				error: action.payload,
				done: false
			}
		}
		case FETCH_DESCRIPTIONS_FULFILLED: {
			return {
				...state,
				done: true,
				descriptions: action.payload
			}
		}
		default: {
			return {...state}
		}
	}
}

export function savedDescriptionsByUser(state =
																				 {
																					 saved: null,
																					 done: false
																				 }, action) {
	switch (action.type) {
		case FETCH_SAVED_DESCRIPTIONS_REJECTED: {
			return {
				...state,
				error: action.payload,
				done: false
			}
		}
		case FETCH_SAVED_DESCRIPTIONS_FULFILLED: {
			return {
				...state,
				done: true,
				saved: action.payload
			}
		}
		default: {
			return {...state}
		}
	}
}



export function descriptionById(state =
																				 {
																					 description: null,
																					 done: false
																				 }, action) {
	switch (action.type) {
		case FETCH_DESCRIPTION_BY_ID_REJECTED: {
			return {
				...state,
				error: action.payload,
				done: false
			}
		}
		case FETCH_DESCRIPTION_BY_ID_FULFILLED: {
			return {
				...state,
				done: true,
				description: action.payload
			}
		}
		default: {
			return {...state}
		}
	}
}

export function vinnsl(state =
																	{
																		vinnsl: null,
																		done: false
																	}, action) {
	switch (action.type) {
		case GENERATE_VINNSL_REJECTED: {
			return {
				...state,
				error: action.payload,
				done: false
			}
		}
		case GENERATE_VINNSL_FULFILLED: {
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
