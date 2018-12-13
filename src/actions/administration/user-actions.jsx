import axios from "axios"

import {HOST_USER_SERVICE} from "../../restclient/abstract-rest-client"

import {LOGIN_FULFILLED, LOGIN_REJECTED, REGISTRATION_FULFILLED, REGISTRATION_REJECTED, GET_USER_FULFILLED, GET_USER_REJECTED} from "../../constants/administration/user-constants"


export function login(userData) {
	return function (dispatch) {
		console.log(HOST_USER_SERVICE + "user/login"+ userData);
		return axios.post(HOST_USER_SERVICE + "user/login", userData)
			.then((res) => {
				dispatch({type: LOGIN_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: LOGIN_REJECTED, payload: err})
			})
	}
}

export function registration(userData) {
	return function (dispatch) {
		return axios.post(HOST_USER_SERVICE + "user/signup", userData)
			.then((res) => {
				dispatch({type: REGISTRATION_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: REGISTRATION_REJECTED, payload: err})
			})
	}
}

export function getUserByIdentity(user) {
	return function (dispatch) {
		return axios.get(HOST_USER_SERVICE + "user/" + user)
			.then((res) => {
				dispatch({type: GET_USER_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: GET_USER_REJECTED, payload: err})
			})
	}
}
