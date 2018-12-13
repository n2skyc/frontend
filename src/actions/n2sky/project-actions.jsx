import axios from "axios"
import {
	CREATE_PROJECT_FULFILLED,
	CREATE_PROJECT_REJECTED,
	FETCH_PROJECTS_FULFILLED,
	FETCH_PROJECTS_REJECTED,
	ADD_NN_ID_TO_PROJECT_FULFILLED,
	ADD_NN_ID_TO_PROJECT_REJECTED,
	DELETE_PROJECT_FULFILLED,
	DELETE_PROJECT_REJECTED
} from "../../constants/n2sky/n2sky-constants"
import {HOST_MODEL_REPO_SERVICE} from "../../restclient/abstract-rest-client"


export function createObject(prj) {
	return function (dispatch) {
		return axios.post(HOST_MODEL_REPO_SERVICE + "project/create", prj)
			.then((res) => {
				dispatch({type: CREATE_PROJECT_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: CREATE_PROJECT_REJECTED, payload: err})
			})
	}
}

export function getProjectsByParams(params) {
	return function (dispatch) {
		return axios.post(HOST_MODEL_REPO_SERVICE + "projects/0/100", params)
			.then((res) => {
				dispatch({type: FETCH_PROJECTS_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: FETCH_PROJECTS_REJECTED, payload: err})
			})
	}
}

export function getProjectById(id) {
	return function (dispatch) {
		return axios.get(HOST_MODEL_REPO_SERVICE + "project/" + id)
			.then((res) => {
				dispatch({type: FETCH_PROJECTS_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: FETCH_PROJECTS_REJECTED, payload: err})
			})
	}
}


export function addNNIdProject(id, nnId) {
	let endpoint = HOST_MODEL_REPO_SERVICE + "project/add_nn_id/" + id;
	return function (dispatch) {
		return axios.post(endpoint, nnId)
			.then((res) => {
				dispatch({type: ADD_NN_ID_TO_PROJECT_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: ADD_NN_ID_TO_PROJECT_REJECTED, payload: err})
			})
	}
}

export function removeNNIdProject(id, nnId) {
	let endpoint = HOST_MODEL_REPO_SERVICE + "project/delete_nn_id/" + id;
	return function (dispatch) {
		return axios.post(endpoint, nnId)
			.then((res) => {
				dispatch({type: ADD_NN_ID_TO_PROJECT_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: ADD_NN_ID_TO_PROJECT_REJECTED, payload: err})
			})
	}
}

export function addModelIdProject(id, modelId) {
	let endpoint = HOST_MODEL_REPO_SERVICE + "project/add_model_id/" + id;
	return function (dispatch) {
		return axios.post(endpoint, modelId)
			.then((res) => {
				dispatch({type: ADD_NN_ID_TO_PROJECT_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: ADD_NN_ID_TO_PROJECT_REJECTED, payload: err})
			})
	}
}

export function deleteProjectById(id) {
	return function (dispatch) {
		return axios.delete(HOST_MODEL_REPO_SERVICE + "project/" + id, {})
			.then((res) => {
				dispatch({type: DELETE_PROJECT_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: DELETE_PROJECT_REJECTED, payload: err})
			})
	}
}

export function deleteNNFromProject( nnId) {
	return function (dispatch) {
		return axios.delete(HOST_MODEL_REPO_SERVICE + "project/nn/" + nnId, {})
			.then((res) => {
				dispatch({type: DELETE_PROJECT_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: DELETE_PROJECT_REJECTED, payload: err})
			})
	}
}
