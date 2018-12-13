import axios from "axios"

import {HOST_MODEL_REPO_SERVICE} from "../../restclient/abstract-rest-client"

import {
	TRAIN_NEURAL_NETWROK_FULFILLED,
	TRAIN_NEURAL_NETWROK_REJECTED,
	TEST_NEURAL_NETWROK_FULFILLED,
	TEST_NEURAL_NETWROK_REJECTED,
	FETCH_MODELS_BY_DESC_ID_FULFILLED,
	FETCH_MODELS_BY_DESC_ID_REJECTED,
	FETCH_MODELS_LOGS_FULFILLED,
	FETCH_MODELS_LOGS_REJECTED
} from "../../constants/n2sky/n2sky-constants"


export function train(trainData) {
	return function (dispatch) {
		return axios.post(HOST_MODEL_REPO_SERVICE + "nn/train", trainData)
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
		return axios.post(HOST_MODEL_REPO_SERVICE + "nn/test", request)
			.then((res) => {
				dispatch({type: TEST_NEURAL_NETWROK_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: TEST_NEURAL_NETWROK_REJECTED, payload: err})
			})
	}
}


export function getModels(params, from, to) {
	let endpoint = HOST_MODEL_REPO_SERVICE + "nn/models" + "/" + from + "/" + to;
	return function (dispatch) {
		return axios.post(endpoint, params)
			.then((res) => {
				dispatch({type: FETCH_MODELS_BY_DESC_ID_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: FETCH_MODELS_BY_DESC_ID_REJECTED, payload: err})
			})
	}
}

export function getModelLogs(endpoint, modelId) {

	let reqParams = {
		endpoint: endpoint,
		modelId: modelId
	};

	return function (dispatch) {
		return axios.post(HOST_MODEL_REPO_SERVICE + "nn/logs/", reqParams)
			.then((res) => {
				dispatch({type: FETCH_MODELS_LOGS_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: FETCH_MODELS_LOGS_REJECTED, payload: err})
			})
	}
}



