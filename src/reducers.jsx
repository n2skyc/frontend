import {combineReducers} from "redux"
import {responsiveStateReducer} from 'redux-responsive'


import openstackProjectsReducer from './reducers/dashboard/openstack/openstack-projects-reducer'
import openstackProjectByIdReducer from './reducers/dashboard/openstack/openstack-prokect-by-id-reducer'
import flavor from './reducers/dashboard/openstack/flavor-reducer'
import openstackServers from './reducers/dashboard/openstack/server-reducer'
import monitoring from './reducers/dashboard/openstack/monitoring-reducer'
import openstackServerDetails from './reducers/dashboard/openstack/server-details-reducer'
import openstackUserConfig from './reducers/dashboard/openstack/openstack-user-config'
import openstackMonitoringConfig from './reducers/dashboard/openstack/openstack-monitoring-config'
import serverDetails from './reducers/dashboard/openstack/server-by-id-reducer'
import removeOpenstackMonitoring from './reducers/dashboard/openstack/openstack-remove-monitoring'
import openstackNeutron from './reducers/dashboard/openstack/openstack-neutron-reducer'
import openstackImages from './reducers/dashboard/openstack/openstack-images-reducer'
import openstackVitrage from './reducers/dashboard/openstack/openstack-templates-reducer'

import login from './reducers/administration/login-reducer'
import reg from './reducers/administration/reg-reducer'
import window from './reducers/administration/window-reducer'

import {getUserByIdentity} from './reducers/administration/user-reducer'


import neuralNetwork from './reducers/n2sky/neural-network-reducer'
import dockerHub from './reducers/n2sky/dockerhub-user-reducer'

import {getDescriptionsReducer, descriptionById, savedDescriptionsByUser, vinnsl} from './reducers/n2sky/description-reducer'
import {getAlerts} from './reducers/alert/alerts-reducer'
import {modelsByDescId, modelById, trainedModel, modelLogs} from './reducers/n2sky/models-reducer'
import {vinnslCreate} from './reducers/n2sky/vinnsl-redicers'
import {projectCreate, projects} from './reducers/n2sky/project-reducers'

export default combineReducers({
	browser: responsiveStateReducer,
	openstackProjectsReducer,
	openstackProjectByIdReducer,
	flavor,
	openstackServers,
	monitoring,
	openstackUserConfig,
	openstackMonitoringConfig,
	openstackServerDetails,
	serverDetails,
	removeOpenstackMonitoring,
	openstackNeutron,
	openstackImages,
	openstackVitrage,
	login, reg, getUserByIdentity, window,
	neuralNetwork,
	dockerHub,
	getDescriptionsReducer, descriptionById, savedDescriptionsByUser, vinnsl,
	getAlerts,
	modelsByDescId, modelById, trainedModel, modelLogs,
	vinnslCreate,
	projectCreate, projects
});
