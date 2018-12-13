import React from 'react';
import {connect} from 'react-redux';
import {getOpenstackProjects} from "../../../actions/dashboard/openstack-actions"
import {getOpenStackUserConfigData} from '../../../actions/dashboard/openstack-monitoring-actions'
import Loader from './../../core/loader/loader'
import ProjectsDashlet from './dashlets/projects-dashlet'
import MonitoringDashlet from './dashlets/monitoring-dashlet-new'


@connect((store) => {
	return {
		projects: store.openstackProjectsReducer.projects,
		fetched: store.openstackProjectsReducer.fetched,
		openstackUserConfig: store.openstackUserConfig.config,
		openstackUserConfigFetched: store.openstackUserConfig.fetched

	}
})
export default class OpenStackMainDashboard extends React.Component {

	constructor(props) {
		super(props);
		this.props.dispatch(getOpenstackProjects());

		this.props.dispatch(getOpenStackUserConfigData(localStorage.getItem("user"), "openstack"));

	}


	addDashlets(projects) {
		if (!projects.projects) return null;
		return projects.projects.map(prj => <ProjectsDashlet key={prj.id} project={prj}/>);
	}

	addMonitoringDashlets() {
		return this.props.openstackUserConfig.map(conf => <MonitoringDashlet key={conf.metric} conf={conf}/>);
	}



	render() {
		return (
			<div>
				{this.props.fetched ? this.addDashlets(this.props.projects) : <Loader/>}
				{this.props.openstackUserConfigFetched ? this.addMonitoringDashlets() : <Loader/>}
			</div>
		)
	}
}
