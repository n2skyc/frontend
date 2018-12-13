import axios from "axios"

import {HOST_MODEL_REPO_SERVICE} from "../../restclient/abstract-rest-client"

import {
	TRAIN_NEURAL_NETWROK_FULFILLED,
	TRAIN_NEURAL_NETWROK_REJECTED,
	TEST_NEURAL_NETWROK_REJECTED,
	TEST_NEURAL_NETWROK_FULFILLED,
	SAVE_DESCRIPTION_FULFILLED,
	SAVE_DESCRIPTION_REJECTED,
	FETCH_DESCRIPTIONS_FULFILLED,
	FETCH_DESCRIPTIONS_REJECTED,
	FETCH_DESCRIPTION_BY_ID_FULFILLED,
	FETCH_DESCRIPTION_BY_ID_REJECTED,
	FETCH_MODELS_BY_DESC_ID_FULFILLED,
	FETCH_MODELS_BY_DESC_ID_REJECTED,
	FETCH_MODEL_BY_ID_FULFILLED,
	FETCH_MODEL_BY_ID_REJECTED,
	FETCH_SAVED_DESCRIPTIONS_FULFILLED,
	FETCH_SAVED_DESCRIPTIONS_REJECTED,
	RUN_INSTANCE_DESCRIPTION_FULFILLED,
	RUN_INSTANCE_DESCRIPTION_REJECTED,
	GENERATE_VINNSL_REJECTED,
	GENERATE_VINNSL_FULFILLED
} from "../../constants/n2sky/n2sky-constants"


export function train(trainData) {
	return function (dispatch) {
		return axios.post(HOST_MODEL_REPO_SERVICE + "model/train", trainData)
			.then((res) => {
				dispatch({type: TRAIN_NEURAL_NETWROK_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: TRAIN_NEURAL_NETWROK_REJECTED, payload: err})
			})
	}
}

export function test(request) {
	return function (dispatch) {
		return axios.post(HOST_MODEL_REPO_SERVICE + "model/test", request)
			.then((res) => {
				dispatch({type: TEST_NEURAL_NETWROK_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: TEST_NEURAL_NETWROK_REJECTED, payload: err})
			})
	}
}

export function saveModelDescription(description) {
	return function (dispatch) {
		return axios.post(HOST_MODEL_REPO_SERVICE + "description/create", description)
			.then((res) => {
				dispatch({type: SAVE_DESCRIPTION_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: SAVE_DESCRIPTION_REJECTED, payload: err})
			})
	}
}

export function copyModelDescription(description) {
	return function (dispatch) {
		return axios.post(HOST_MODEL_REPO_SERVICE + "description/copy", description)
			.then((res) => {
				dispatch({type: "asd", payload: res.data})
			})
			.catch((err) => {
				dispatch({type: "dsa", payload: err})
			})
	}
}

export function removeCopyModelDescription(user, descriptionsId) {
	let endpoint = HOST_MODEL_REPO_SERVICE + "description/remove/copy/" + user + '/' + descriptionsId;
	console.log(endpoint);
	return function (dispatch) {
		return axios.get(HOST_MODEL_REPO_SERVICE + "description/remove/copy/" + user + '/' + descriptionsId)
			.then((res) => {
				dispatch({type: SAVE_DESCRIPTION_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: SAVE_DESCRIPTION_REJECTED, payload: err})
			})
	}
}

export function runInstanceDescription(reqParams, id) {
	return function (dispatch) {
		return axios.post(HOST_MODEL_REPO_SERVICE + "description/run/instance/" + id, reqParams)
			.then((res) => {
				dispatch({type: RUN_INSTANCE_DESCRIPTION_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: RUN_INSTANCE_DESCRIPTION_REJECTED, payload: err})
			})
	}
}

export function stopInstanceDescription(reqParams, id) {
	return function (dispatch) {
		return axios.post(HOST_MODEL_REPO_SERVICE + "description/stop/instance/" + id, reqParams)
			.then((res) => {
				dispatch({type: RUN_INSTANCE_DESCRIPTION_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: RUN_INSTANCE_DESCRIPTION_REJECTED, payload: err})
			})
	}
}

export function getDescriptions(reqParams, from, offsetSize) {
	let endpoint = HOST_MODEL_REPO_SERVICE + "descriptions" + "/" + from + "/" + offsetSize;
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

export function getCopiedDescriptions(user) {
	let endpoint = HOST_MODEL_REPO_SERVICE + "description/references/" + user;
	return function (dispatch) {
		return axios.get(endpoint)
			.then((res) => {
				dispatch({type: FETCH_SAVED_DESCRIPTIONS_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: FETCH_SAVED_DESCRIPTIONS_REJECTED, payload: err})
			})
	}
}

export function getDescriptionById(id) {
	let endpoint = HOST_MODEL_REPO_SERVICE + "description" + "/" + id;
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

export function generateVinnslByDescripId(id) {
	let endpoint = HOST_MODEL_REPO_SERVICE + "vinnsl_descriptions" + "/" + id;
	return function (dispatch) {
		return axios.get(endpoint)
			.then((res) => {
				dispatch({type: GENERATE_VINNSL_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: GENERATE_VINNSL_REJECTED, payload: err})
			})
	}
}

export function updateDescription(id, reqParams) {
	let endpoint = HOST_MODEL_REPO_SERVICE + "description/update/" + id;
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

export function getModelsByDescriptionId(descriptionId) {
	let endpoint = HOST_MODEL_REPO_SERVICE + "models" + "/" + descriptionId;
	return function (dispatch) {
		return axios.get(endpoint)
			.then((res) => {
				dispatch({type: FETCH_MODELS_BY_DESC_ID_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: FETCH_MODELS_BY_DESC_ID_REJECTED, payload: err})
			})
	}
}

export function getModelsByReqParams(descripIds, from, to) {
	let endpoint = HOST_MODEL_REPO_SERVICE + "models/descriptions" + "/" + from + "/" + to;
	return function (dispatch) {
		return axios.post(endpoint, descripIds)
			.then((res) => {
				dispatch({type: FETCH_MODELS_BY_DESC_ID_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: FETCH_MODELS_BY_DESC_ID_REJECTED, payload: err})
			})
	}
}

export function getModelsById(modelId) {
	let endpoint = HOST_MODEL_REPO_SERVICE + "models/id" + "/" + modelId;
	return function (dispatch) {
		return axios.get(endpoint)
			.then((res) => {
				dispatch({type: FETCH_MODEL_BY_ID_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: FETCH_MODEL_BY_ID_REJECTED, payload: err})
			})
	}
}


