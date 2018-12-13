import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {getOpenStackUserConfigData} from '../../actions/dashboard/openstack-monitoring-actions'
import Loader from './../core/loader/loader'
import MonitoringDashlet from './../dashboards/openstack/dashlets/monitoring-dashlet-new'
import SettingsPopUp from './../../layouts/core/popup/settings-popup'
import OpenStackIcon from './../../../res/img/icons/openstack.png'
import CloudifyIcon from './../../../res/img/icons/cloudify.png'
import SettingsIcon from './../../../res/img/icons/settings.svg'
import AlertIcon from './../../../res/img/icons/bell.svg'
import style from './style.scss'

@connect((store) => {
	return {
		openstackUserConfig: store.openstackUserConfig.config,
		openstackUserConfigFetched: store.openstackUserConfig.fetched,
		browser: store.browser

	}
})
export default class DashboardsOverview extends React.Component {


	state = {
		showModal: false
	};

	constructor(props) {
		super(props);
		this.props.dispatch(getOpenStackUserConfigData(localStorage.getItem("user"), 'overview')).then(() => console.log(this.props));
	}




	addMonitoringDashlets() {
		return this.props.openstackUserConfig.map(conf => <MonitoringDashlet key={conf.metric} conf={conf}/>);
	}


	getOpenstackMonitoringPanel() {
		return <div>
			{this.props.openstackUserConfigFetched ? this.addMonitoringDashlets() : <Loader/>}
		</div>
	}

	getNavbar = (text) => {
		return <nav className="topbar">
			<ul>
				<li><span className="no-action">{text}</span></li>
			</ul>
		</nav>
	};

	getAdminTools() {
		let style = "pure-u-1-4";
		if(this.props.browser.is.small || this.props.browser.is.extraSmall) {
			style = "pure-u-1-2";
		} else if (this.props.browser.is.medium || this.props.browser.large) {
			style = "pure-u-1-3";
		} else {
			style = "pure-u-1-4";
		}
		return <div>

			<div className="pure-g admin-tools-container">
				<div className={style}>
					<Link to="/openstack">
						<div>
							<img className="sibar-icon" src={OpenStackIcon}/>
						</div>
						<span>OpenStack Dashboard</span>
					</Link>
				</div>
				<div className={style}>
					<a href="#">
						<div>
							<img className="sibar-icon" src={CloudifyIcon}/>
						</div>
						<span>Cloudify Dashboard</span>
					</a>
				</div>
				<div className={style}>
					<Link to="/alert">
						<div>
							<img className="sibar-icon" src={AlertIcon}/>
						</div>
						<span>Alert Management System</span>
					</Link>
				</div>
				<div className={style}>
					<a onClick={this.showCloseModal.bind(this)} href="#">
						<div>
							<img className="sibar-icon" src={SettingsIcon}/>
						</div>
						<span>Dashboards Settigns</span>
					</a>
				</div>
			</div>
		</div>
	}

	showCloseModal() {

		this.setState({
			showModal: !this.state.showModal
		})
	}

	render() {
		return (
			<div>
				{this.getNavbar("Administration Tools")}
				{this.getAdminTools()}
				{this.getNavbar("Featured Metrics")}
				{this.getOpenstackMonitoringPanel()}

				{this.state.showModal ? <SettingsPopUp showCloseModal={this.showCloseModal.bind(this)}/> : null}
			</div>
		)
	}
}

