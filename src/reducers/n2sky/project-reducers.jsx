import {
	CREATE_PROJECT_REJECTED,
	CREATE_PROJECT_FULFILLED,
	FETCH_PROJECTS_REJECTED,
	FETCH_PROJECTS_FULFILLED
} from "../../constants/n2sky/n2sky-constants"

export function projectCreate(state =
															 {
																 project: null,
																 done: false
															 }
	, action) {
	switch (action.type) {
		case CREATE_PROJECT_REJECTED: {
			return {
				...state,
				error: action.payload,
				done: false
			}
		}
		case CREATE_PROJECT_FULFILLED: {
			return {
				...state,
				done: true,
				project: action.payload
			}
		}
		default: {
			return {...state}
		}
	}
}

export function projects(state =
													 {
														 projects: null,
														 done: false
													 }
	, action) {
	switch (action.type) {
		case FETCH_PROJECTS_REJECTED: {
			return {
				...state,
				error: action.payload,
				done: false
			}
		}
		case FETCH_PROJECTS_FULFILLED: {
			return {
				...state,
				done: true,
				projects: action.payload
			}
		}
		default: {
			return {...state}
		}
	}
}
