import axios from "axios"

import {GET_PROJECTS} from "../../restclient/dashboard/openstack-rest-client"
import {HOST} from "../../restclient/abstract-rest-client"

import {
	FETCH_OPENSTACK_PROJECTS_FULFILLED,
	FETCH_OPENSTACK_PROJECTS_REJECTED,
	FETCH_OPENSTACK_PROJECT_BY_ID_FULFILLED,
	FETCH_OPENSTACK_PROJECT_BY_ID_REJECTED,
	FETCH_FLAVOR_FULFILLED,
	FETCH_FLAVOR_REJECTED,
	FETCH_SERVER_FULFILLED,
	FETCH_SERVER_REJECTED,
	FETCH_SERVER_BY_ID_FULFILLED,
	FETCH_SERVER_BY_ID_REJECTED,
	FETCH_NETRON_FULFILLED,
	FETCH_NETRON_REJECTED,
	FETCH_IMAGES_FULFILLED,
	FETCH_IMAGES_REJECTED,
	FETCH_TEMPLATES_FULFILLED,
	FETCH_TEMPLATES_REJECTED,
	FETCH_TEMPLATE_BY_ID_FULFILLED,
	FETCH_TEMPLATE_BY_ID_REJECTED,
	FETCH_RECOURCES_FULFILLED,
	FETCH_RECOURCES_REJECTED

} from "../../constants/dashboard/openstack-constants"

export function getOpenstackProjects() {
	return function (dispatch) {
		 return axios.get(GET_PROJECTS)
			.then((res) => {
				dispatch({type: FETCH_OPENSTACK_PROJECTS_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: FETCH_OPENSTACK_PROJECTS_REJECTED, payload: err})
			})
	}
}

export function getOpenstackProjectById(id) {
	return function (dispatch) {
		return axios.get(GET_PROJECTS + '/' + id)
			.then((res) => {
				dispatch({type: FETCH_OPENSTACK_PROJECT_BY_ID_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: FETCH_OPENSTACK_PROJECT_BY_ID_REJECTED, payload: err})
			})
	}
}

export function getOpenstackFlavor(id) {
	return function (dispatch) {
		axios.get(HOST + '/flavors/' + id)
			.then((res) => {
				dispatch({type: FETCH_FLAVOR_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: FETCH_FLAVOR_REJECTED, payload: err})
			})
	}
}

export function getOpenstackServers(id) {
	return function (dispatch) {
		return axios.get(HOST + '/servers/' + id)
			.then((res) => {
				dispatch({type: FETCH_SERVER_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: FETCH_SERVER_REJECTED, payload: err})
			})
	}
}

export function getOpenstackServerById(projectId, serverId) {
	return function (dispatch) {
		axios.get(HOST + '/server/' + [projectId, serverId].join("/"))
			.then((res) => {
				dispatch({type: FETCH_SERVER_BY_ID_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: FETCH_SERVER_BY_ID_REJECTED, payload: err})
			})
	}
}

export function getOpenstackServerInfo(command, projectid, serverid) {
	return function (dispatch) {
		axios.get(HOST + '/servers/' + [command, projectid, serverid].join("/"))
			.then((res) => {
				dispatch({type: "FETCH_SERVER_INFO_FULFILLED_" + command, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: "FETCH_SERVER_INFO_REJECTED_" + command, payload: err})
			})
	}
}

export function getOpenstackNutronByType(type) {
	return function (dispatch) {
		axios.get(HOST + '/' + type)
			.then((res) => {
				dispatch({type: type + '/' + FETCH_NETRON_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: type + '/' + FETCH_NETRON_REJECTED, payload: err})
			})
	}
}

	export function getOpenstackImages() {
		return function (dispatch) {
			axios.get(HOST + '/images')
				.then((res) => {
					dispatch({type: FETCH_IMAGES_FULFILLED, payload: res.data})
				})
				.catch((err) => {
					dispatch({type: FETCH_IMAGES_REJECTED, payload: err})
				})
		}
	}
// 		export function openstackImageDownload(id) {
// 			return function (dispatch) {
// 				axios.get(HOST + '/images/image/' + id)
// 					.then((res) => {
// 						dispatch({type: xxx, payload: res.data})
// 					})
// 					.catch((err) => {
// 						dispatch({type: xxx, payload: err})
// 					})
// 			}
// }

export function getOpenstackTemplates() {
	return function (dispatch) {
		return axios.get(HOST + '/rca/template')
			.then((res) => {
				dispatch({type: FETCH_TEMPLATES_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: FETCH_TEMPLATES_REJECTED, payload: err})
			})
	}
}

export function getOpenstackTemplateById(id) {
	return function (dispatch) {
		return axios.get(HOST + '/rca/template/' + id)
			.then((res) => {
				dispatch({type: FETCH_TEMPLATE_BY_ID_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: FETCH_TEMPLATE_BY_ID_REJECTED, payload: err})
			})
	}
}

export function getOpenstackRecources() {
	return function (dispatch) {
		axios.get(HOST + '/rca/resources')
			.then((res) => {
				dispatch({type: FETCH_RECOURCES_FULFILLED, payload: res.data})
			})
			.catch((err) => {
				dispatch({type: FETCH_RECOURCES_REJECTED, payload: err})
			})
	}
}

