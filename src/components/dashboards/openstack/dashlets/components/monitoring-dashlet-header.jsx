import React from 'react'
import {connect} from 'react-redux'
import style from './style.scss'
import RemoveIcon from './../../../../../../res/img/icons/delete.svg'
import {removeMonitoringDashlet} from '../../../../../actions/dashboard/openstack-monitoring-actions'

@connect((store) => {
	return {
		removeOpenstackMonitoring: store.removeOpenstackMonitoring
	}
})
export default class MonitoringDashletHeader extends React.Component {

	state = {
		hover: false
	};

	constructor(props) {
		super(props);
	}

	generateName(name) {
		let clean = name.replace(/_/g, " ");
		return clean;
	}

	removeDashlet(){
		this.props.dispatch(removeMonitoringDashlet(this.props.conf._id)).then(r => location.reload());
	}

	render() {
		return (
			<div onMouseEnter={()=> {this.setState({hover : true})}} onMouseLeave={()=> {this.setState({hover : false})}} className="dashlet-header">
				<div className="left-side">
					<h1>{this.generateName(this.props.name)}</h1>
					<span>Server: {this.props.conf.selectedServerName}</span>
				</div>
				<div className="right-side">
					<img onClick={this.removeDashlet.bind(this)} src={RemoveIcon}/>
				</div>
			</div>
		)
	}
}
