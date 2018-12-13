import React from 'react';
import {connect} from 'react-redux'
import {getOpenstackServerInfo, getOpenstackServerById} from "../../../../actions/dashboard/openstack-actions"
import {getOpenStackUserConfigData} from '../../../../actions/dashboard/openstack-monitoring-actions'
import Loader from './../../../core/loader/loader'
import MonitoringDashlet from './../dashlets/monitoring-dashlet-new'
import ServerIconWhite from './../../../../../res/img/icons/cloud-computing-white.svg'


@connect((store) => {
	return {
		details: store.openstackServerDetails,
		instanceActions: store.openstackServerDetails.instanceActions,
		interfaceAttachments: store.openstackServerDetails.interfaceAttachments,
		security_groups: store.openstackServerDetails.security_groups,
		server: store.serverDetails.server,
		openstackUserConfig: store.openstackUserConfig.config,
		openstackUserConfigFetched: store.openstackUserConfig.fetched
	}
})
export default class ServerDetailsDashboard extends React.Component {

	constructor(props) {
		super(props);
		this.props.dispatch(getOpenstackServerById(props.params.projectid, props.params.serverid));
		this.props.dispatch(getOpenstackServerInfo("os-security-groups", props.params.projectid, props.params.serverid));
		this.props.dispatch(getOpenstackServerInfo("os-instance-actions", props.params.projectid, props.params.serverid));
		this.props.dispatch(getOpenstackServerInfo("os-interface", props.params.projectid, props.params.serverid));

		this.props.dispatch(getOpenStackUserConfigData(localStorage.getItem("user"), props.params.serverid));

	}

	addMonitoringDashlets() {
		return this.props.openstackUserConfig.map(conf => <MonitoringDashlet key={conf.metric} conf={conf}/>);
	}

	createDashlet(title, body) {
		return <div className="pure-u-1-4 pure-sm-1-1">
			<div className="dashlet-container">
				<div className="title">{title}</div>
				<ul>
					{body}
				</ul>
			</div>
		</div>
	}

	addIpAddresses() {
		if (!this.props.server) return <Loader/>;
		let bodyList = this.props.server.server.addresses.public.map(ip => {
			return <li key={ip.addr}> IP Address: {ip.addr}, type: {ip["OS-EXT-IPS:type"]}</li>
		});
		return this.createDashlet("Allocated Ip Adresses", bodyList);
	}

	addInstancesActions() {
		if (!this.props.instanceActions) return <Loader/>;
		let bodyList = this.props.instanceActions.instanceActions.map(item => {
			return <li key={item.request_id}> Action: {item.action}, at {item.start_time}</li>
		});
		return this.createDashlet("Instance actions", bodyList);
	}

	addInterfaceAttachments() {
		if (!this.props.interfaceAttachments) return <Loader/>;
		let bodyList = this.props.interfaceAttachments.interfaceAttachments.map(item => {
			return <li key={item.mac_addr}>
				<div className="multiple-line-item">
					<ul> {item.fixed_ips.map(ip => {
						return <li key={ip.ip_address}> Fixed Ip: {ip.ip_address}</li>
					})}
						<li>Mac Address: {item.mac_addr}</li>
						<li>Port State: {item.port_state}</li>
					</ul>
				</div>
			</li>
		});
		return this.createDashlet("Interface attachments", bodyList);
	}

	addSecurityGroups() {
		if (!this.props.security_groups) return <Loader/>;
		let bodyList = this.props.security_groups.security_groups.map(item => {
			return <li key={item.id}>
				<div className="multiple-line-item">
					<ul>
						<li> Name: {item.name}</li>
						<li> Descriptopn: {item.description}</li>
					</ul>
				</div>
			</li>
		});
		return this.createDashlet("Security Groups", bodyList);
	}

	render() {
		return (
			<div>
				{this.props.server ? <div className="server-title">
					<img src={ServerIconWhite}/>
					<div><h1>{this.props.server.server.name}</h1>
					<span>Status: {this.props.server.server.status}</span></div>
				</div> : <Loader/>}
				{this.addIpAddresses()}
				{this.addInstancesActions()}
				{this.addInterfaceAttachments()}
				{this.addSecurityGroups()}
				<div className="monitoring-dashboard-container">
				{this.props.openstackUserConfigFetched ? this.addMonitoringDashlets() : <Loader/>}
				</div>
			</div>
		)
	}

}
