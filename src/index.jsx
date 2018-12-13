'use strict';

import React from 'react'
import {render} from 'react-dom'
import {Router, Route, Link, browserHistory} from 'react-router'
import {Provider} from "react-redux"
import store from "./store"
import style from './../styles/index.scss'

import AbstractDashboardLayout from './layouts/dashboards/abstract-dashboard-layout'
import AbstractUserN2SkyLayout from './layouts/dashboards/abstract-user-n2sky-layout'


import Auth from './components/auth/auth'
import Reg from './components/auth/registration'
import UserProfile from './components/auth/user-profile'
import DashboardsOverview from './components/dashboards/dashbpards-overview'
import OpenStackMainDashboard from './components/dashboards/openstack/openstack-main-dashboard'
import OpenStackProjectDashboard from './components/dashboards/openstack/openstack-project-dashboard'
import ServerDetailsDashboard from './components/dashboards/openstack/boards/server-details-dashlet'
import VitrageDetailsView from './components/dashboards/openstack/boards/vitrage-details-view'

import AlertDashboard from './components/dashboards/alert/alert-main-dashboard'

import N2SkyDashboard from './components/dashboards/n2sky/n2sky-main-dashboard'
import AvailableNetworksOverview from './components/dashboards/n2sky/components/available-networks-overview'

import NetworkDetails from './components/dashboards/n2sky/components/network-details'
import NetworkTestDetails from './components/dashboards/n2sky/components/network-test-details'
import ModelsRepository from './components/dashboards/n2sky/models/model-repository'
import AddNNFromParadigm from './components/dashboards/n2sky/paradigm/add-nn-from-paradigm'
import ProjectDashboard from './components/dashboards/projects/projects-dashboard'

render((
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={Auth}/>
			<Route path="/signup" component={Reg}/>
			<Route component={AbstractDashboardLayout}>
				<Route path="/user/profile" component={UserProfile}/>
				<Route path="/overview" component={DashboardsOverview}/>
				<Route path="/openstack" component={OpenStackMainDashboard}/>
				<Route path="/openstack/project/:id" component={OpenStackProjectDashboard}/>
				<Route path="/openstack/server/:projectid/:serverid" component={ServerDetailsDashboard}/>
				<Route path="/openstack/vitrage/:templateId" component={VitrageDetailsView}/>
				<Route path="/alert" component={AlertDashboard}/>
			</Route>
			<Route component={AbstractDashboardLayout}>
				<Route path="/n2sky" component={N2SkyDashboard}/>
				<Route path="/n2sky/available" components={AvailableNetworksOverview}/>
				<Route path="/n2sky/models" components={ModelsRepository}/>
				<Route path="/n2sky/paradigm/create/:projectid" components={AddNNFromParadigm} readOnly={false}/>
				<Route path="/n2sky/paradigm/nn/:id" components={AddNNFromParadigm} readOnly={true}/>
				<Route path="/n2sky/network/:id" component={NetworkDetails}/>
				<Route path="/n2sky/network/:id/test/:model_id" component={NetworkTestDetails}/>
				<Route path="/n2sky/project/:id" component={ProjectDashboard}/>
			</Route>
		</Router>
	</Provider>
), document.getElementById('app'));
