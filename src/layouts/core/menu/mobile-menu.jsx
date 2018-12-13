import React from 'react'
import {Link} from 'react-router'
import UserIcon from './../../../../res/img/icons/user.svg'
import OpenStackIcon from './../../../../res/img/icons/openstack.png'
import CloudifyIcon from './../../../../res/img/icons/cloudify.png'
import N2SkyIcon from './../../../../res/img/logo-white.svg'
import SettingsIcon from './../../../../res/img/icons/settings.svg'
import AlertIcon from './../../../../res/img/icons/bell.svg'
import CloudCreate from './../../../../res/img/icons/cloud-create.svg'
import Networkcon from './../../../../res/img/icons/network.svg'
import AdminIcon from './../../../../res/img/icons/algorithm.svg'
import {browserHistory} from 'react-router'
import ModelsIcon from './../../../../res/img/icons/cube.svg'
import './style.scss'

export default class MobileMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showMobileMenu: false,
			toggle: 'hamburger',
			type: localStorage.getItem("type"),
			showSettings: false
		};
	}

	logout() {
		localStorage.removeItem("user");
		browserHistory.push('/');
	}

	showSettings(isShow) {
		this.setState({showSettings: isShow})
	}

	getAdministrationSettings() {
		return <div className="admin-options">
			<li onClick={this.changeToggleState.bind(this)}>
				<Link to="/openstack">
					<img className="sibar-icon" src={OpenStackIcon}/>
					<p>OpenStack Dashboard</p>
				</Link>
			</li>

			<li onClick={this.changeToggleState.bind(this)}>
				<a href="#">
					<img className="sibar-icon" src={CloudifyIcon}/>
					<p>Cloudify Dashboard</p>
				</a>
			</li>
			<li onClick={this.changeToggleState.bind(this)}>
				<Link to="/alert">
					<img className="sibar-icon" src={AlertIcon}/>
					<p>Alert System</p>
				</Link>
			</li>
			<li onClick={this.changeToggleState.bind(this)}>
				<a onClick={this.props.showCloseModal} href="#">
					<img className="sibar-icon" src={SettingsIcon}/>
					<p>Dashboards Settigns</p>
				</a>
			</li>
		</div>
	}


	getButton() {
		return <button onClick={this.changeToggleState.bind(this)} className={this.state.toggle}>
			<span className="burger"/>
			<span className="burger"/>
			<span className="burger"/>
		</button>
	}

	getMainMenu() {
		return <div>
			<li onClick={this.changeToggleState.bind(this)}>
				<Link to="/n2sky">
					<img className="sibar-icon" src={N2SkyIcon}/>
					<p>N2Sky Dashboard</p>
				</Link>
			</li>
			<li onClick={this.changeToggleState.bind(this)}>
				<Link to="/n2sky/available" className="sidebar-link">
					<img className="sibar-icon" src={Networkcon}/>
					<p>Available neural networks</p>
				</Link>
			</li>
			<li onClick={this.changeToggleState.bind(this)}>
				<Link to="/n2sky/models" className="sidebar-link">
					<img className="sibar-icon" src={ModelsIcon}/>
					<p>Models repository</p>
				</Link>
			</li>
		</div>
	}

	getMobileMenu() {
		return <div className="menu-expanded head-nav">
			<nav>
				<ul className="menu">

					{this.state.type === 'admin' ?
						<div onMouseOver={this.showSettings.bind(this, true)} onMouseLeave={this.showSettings.bind(this, false)}>
							<li onClick={this.changeToggleState.bind(this)}>
								<Link to="/overview">
									<img className="sibar-icon" src={AdminIcon}/>
									<p>Administration</p>
								</Link>
							</li>
							{this.state.showSettings ? this.getAdministrationSettings() : null}
						</div> : null}

					{this.getMainMenu()}

					<li onClick={this.changeToggleState.bind(this)}>
						<Link>
							<img className="sibar-icon" src={UserIcon}/>
							<div className="mulitple-lines">
									<span onClick={() => {
										browserHistory.push('/user/profile')
									}}>Profile</span>
								<p onClick={this.logout.bind(this)}>Logout</p>
							</div>
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	}

	changeToggleState() {
		this.setState({
			showMobileMenu: !this.state.showMobileMenu,
			toggle: !this.state.showMobileMenu == false ? 'hamburger' : 'hamburger focus'
		});
	}

	render() {
		let mobileMenu = this.state.showMobileMenu ? this.getMobileMenu() : '';
		return (
			<div className="mobile-menu">
				{this.getButton()}
				{mobileMenu}
			</div>
		)
	}
}
