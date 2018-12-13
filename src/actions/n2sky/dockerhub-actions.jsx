import axios from "axios"

import {HOST_MODEL_REPO_SERVICE} from "../../restclient/abstract-rest-client"


import {GET_DOCKERHUB_USER_FULFILLED, GET_DOCKERHUB_USER_REJECTED } from "../../constants/n2sky/dockerhub-constants"


export function getDockerGubUserProjects(user) {
	return function (dispatch) {
		return axios.get(HOST_MODEL_REPO_SERVICE + "docker/hub/" + user)
			.then((res) => {
				dispatch({type: GET_DOCKERHUB_USER_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: GET_DOCKERHUB_USER_REJECTED, payload: err})
			})
	}
}
