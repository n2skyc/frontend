import axios from "axios"

import {MONITORING_API, USER_API} from "../../restclient/abstract-rest-client"

import {
	FETCH_MONITORING_DATA_FULFILLED,
	FETCH_MONITORING_DATA_REJECTED,
	FETCH_OPENSTACK_USER_CONFIG_FULFILLED,
	FETCH_OPENSTACK_USER_CONFIG_REJECTED,
	FETCH_OPENSTACK_MONITORING_CONFIG_REJECTED,
	FETCH_OPENSTACK_MONITORING_CONFIG_FULFILLED,
	REMOVE_OPENSTACK_MONITORING_CONFIG_FULFILLED,
	REMOVE_OPENSTACK_MONITORING_CONFIG_REJECTED
} from "../../constants/dashboard/monitoring-constants"

export function getMonitoringData(m) {
	return function (dispatch) {
		let monitoringEndpoint = [MONITORING_API, m.server, m.metric, m.delay, m.delaytype, m.step].join('/');
		return axios.get(monitoringEndpoint)
				.then((res) => {
					dispatch({type: m.metric + '/'+ FETCH_MONITORING_DATA_FULFILLED, payload: res.data})
				})
				.catch((err) => {
					dispatch({type: m.metric + '/' + FETCH_MONITORING_DATA_REJECTED, payload: err})
				})
		}
}

export function getOpenStackUserConfigData(user, show) {
	return function (dispatch) {
		let endpoint = [USER_API, 'dashboard', 'openstack', user, show].join('/');
		return axios.get(endpoint)
			.then((res) => {
				dispatch({type: FETCH_OPENSTACK_USER_CONFIG_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: FETCH_OPENSTACK_USER_CONFIG_REJECTED, payload: err})
			})
	}
}


export function getOpenStackMonitoringConfig(host) {
	return function (dispatch) {
		let endpoint = [MONITORING_API, 'metrics', host].join('/');
		return axios.get(endpoint)
			.then((res) => {
				dispatch({type: FETCH_OPENSTACK_MONITORING_CONFIG_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: FETCH_OPENSTACK_MONITORING_CONFIG_REJECTED, payload: err})
			})
	}
}

export function removeMonitoringDashlet(id) {
	return function (dispatch) {
		let endpoint = [USER_API, 'dashboard', 'openstack', id].join('/');
		return axios.delete(endpoint)
			.then((res) => {
				dispatch({type: REMOVE_OPENSTACK_MONITORING_CONFIG_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: REMOVE_OPENSTACK_MONITORING_CONFIG_REJECTED, payload: err})
			})
	}
}

export function addOpenStackDashLet(config) {
	return function (dispatch) {
		let endpoint = [USER_API, 'dashboard', 'openstack'].join('/');
		return axios.post(endpoint, config)
			.then((res) => {
					console.log(res);
			})
			.catch((err) => {
				console.log(err);
			})
	}
}
