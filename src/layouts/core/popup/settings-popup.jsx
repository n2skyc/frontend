import React from 'react'
import OpenStackMonitoringModal from './../../../components/dashboards/core/modal/openstack-new-dashlet-modal'
import OpenStackCreateMetricPopUp from './../../../components/dashboards/openstack/modal/openstack-create-metric-modal'
import CreateAlertPopup from './../../../components/dashboards/alert/create-alert-popup'
import LaptopIcon from './../../../../res/img/icons/laptop.svg'
import BellIcon from './../../../../res/img/icons/bell_black.svg'
import style from './style.scss'


export default class SettingsPopUp extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			showCreateOpenstackDashlet: false,
			showCreateAlertPopup: false
		};

	}

	showCloseModal(modal) {
		this.setState({
			[modal]: !this.state[modal]
		})
	}


	getMainMenu() {
		return <ul className="settings-list">
			<li onClick={this.showCloseModal.bind(this, "showCreateOpenstackDashlet")}><img src={LaptopIcon}/> <span>Create Openstack Monitoring Dashlet</span>
			</li>
			<li onClick={this.showCloseModal.bind(this, "showCreateAlertPopup")}><img src={BellIcon}/>
				<span>Create an Alert</span></li>
		</ul>
	}

	getContent() {
		return <div>
			{this.getMainMenu()}
			{this.state.showCreateOpenstackDashlet ? <OpenStackCreateMetricPopUp
				showCloseModal={this.showCloseModal.bind(this, "showCreateOpenstackDashlet")}/> : null}
			{this.state.showCreateAlertPopup ?
				<CreateAlertPopup showCloseModal={this.showCloseModal.bind(this, "showCreateAlertPopup")}/> : null}
		</div>
	}


	render() {
		return (<div>

			<OpenStackMonitoringModal showCloseModal={this.props.showCloseModal}
																content={this.getContent()}
																title="Dashboard Settings"/>
		</div>)
	}

}
