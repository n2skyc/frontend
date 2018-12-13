import React from 'react';
import {connect} from 'react-redux'
import {getOpenStackUserConfigData} from '../../../actions/dashboard/openstack-monitoring-actions'
import Loader from './../../../core/loader/loader'
import MonitoringDashlet from './../../../dashboards/openstack/dashlets/monitoring-dashlet-new'
import XORIcon from './../../../../../res/img/icons/xor.svg'


@connect((store) => {
	return {
		// openstackUserConfig: store.openstackUserConfig.config,
		// openstackUserConfigFetched: store.openstackUserConfig.fetched
	}
})
export default class AbstractNetworkComponent extends React.Component {


	state = {
	};

	constructor(props) {
		super(props);
		// this.props.dispatch(getOpenStackUserConfigData(localStorage.getItem("user"), 'overview'));
	}


	getOpenstackMonitoringPanel = () => {
		return <div>
			<img src={XORIcon}/>
		</div>
	};


	render() {
		return (
			<div>
				{this.getOpenstackMonitoringPanel()}
			</div>
		)
	}
}

