import axios from "axios"

import {HOST_MODEL_REPO_SERVICE} from "../../restclient/abstract-rest-client"
import {
	RUN_INSTANCE_DESCRIPTION_FULFILLED,
	RUN_INSTANCE_DESCRIPTION_REJECTED,
	FETCH_DESCRIPTIONS_FULFILLED,
	FETCH_DESCRIPTIONS_REJECTED
} from "../../constants/n2sky/n2sky-constants"

import {
	CREATE_VINNSL_DESCRIPTION_FULFILLED,
	CREATE_VINNSL_DESCRIPTION_REJECTED,
	FETCH_DESCRIPTION_BY_ID_FULFILLED,
	FETCH_DESCRIPTION_BY_ID_REJECTED
} from "./../../constants/n2sky/n2sky-constants"

export function createVinnslDescription(description) {
	return function (dispatch) {
		return axios.post(HOST_MODEL_REPO_SERVICE + "vinnsl/description/create", description)
			.then((res) => {
				dispatch({type: CREATE_VINNSL_DESCRIPTION_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: CREATE_VINNSL_DESCRIPTION_REJECTED, payload: err})
			})
	}
}

export function getVinnslDescriptions(reqParams, from, offsetSize) {
	let endpoint = HOST_MODEL_REPO_SERVICE + "vinnsl/descriptions" + "/" + from + "/" + offsetSize;
	return function (dispatch) {
		return axios.post(endpoint, reqParams)
			.then((res) => {
				dispatch({type: FETCH_DESCRIPTIONS_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: FETCH_DESCRIPTIONS_REJECTED, payload: err})
			})
	}
}

export function uploadVinnslDescription(description) {
	return function (dispatch) {
		return axios.post(HOST_MODEL_REPO_SERVICE + "vinnsl/description/upload", description)
			.then((res) => {
				dispatch({type: CREATE_VINNSL_DESCRIPTION_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: CREATE_VINNSL_DESCRIPTION_REJECTED, payload: err})
			})
	}
}

export function runVinnslInstanceDescription(reqParams, id) {
	return function (dispatch) {
		return axios.post(HOST_MODEL_REPO_SERVICE + "vinnsl/description/run/instance/" + id, reqParams)
			.then((res) => {
				dispatch({type: RUN_INSTANCE_DESCRIPTION_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: RUN_INSTANCE_DESCRIPTION_REJECTED, payload: err})
			})
	}
}

export function updateVinnslDescription(id, reqParams) {
	let endpoint = HOST_MODEL_REPO_SERVICE + "vinnsl/description/update/" + id;
	return function (dispatch) {
		return axios.post(endpoint, reqParams)
			.then((res) => {
				dispatch({type: "DESCRIPTION_UPDATED", payload: res.data})
			})
			.catch((err) => {
				dispatch({type: "DESCRIPTION_NOT_UPDATED", payload: err})
			})
	}
}


export function getVinnslDescriptionById(id) {
	let endpoint = HOST_MODEL_REPO_SERVICE + "vinnsl/description" + "/" + id;
	return function (dispatch) {
		return axios.get(endpoint)
			.then((res) => {
				dispatch({type: FETCH_DESCRIPTION_BY_ID_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: FETCH_DESCRIPTION_BY_ID_REJECTED, payload: err})
			})
	}
}
