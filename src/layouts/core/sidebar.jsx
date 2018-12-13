import React from 'react'
import {Link} from 'react-router'
import UserIcon from './../../../res/img/icons/user.svg'
import OpenStackIcon from './../../../res/img/icons/openstack.png'
import CloudifyIcon from './../../../res/img/icons/cloudify.png'
import N2SkyIcon from './../../../res/img/logo-white.svg'
import SettingsIcon from './../../../res/img/icons/settings.svg'
import AlertIcon from './../../../res/img/icons/bell.svg'
import CloudCreate from './../../../res/img/icons/cloud-create.svg'
import Networkcon from './../../../res/img/icons/network.svg'
import AdminIcon from './../../../res/img/icons/algorithm.svg'
import {browserHistory} from 'react-router'
import ModelsIcon from './../../../res/img/icons/cube.svg'


export default class Sidebar extends React.Component {

	state = {
		type: localStorage.getItem("type"),
		showSettings: false
	};

	logout() {
		localStorage.removeItem("user");
		browserHistory.push('/');
	}


	getAdministrationSettings() {
		return <div className="admin-options">
			<li>
				<Link to="/openstack">
					<img className="sibar-icon" src={OpenStackIcon}/>
					<span>OpenStack Dashboard</span>
				</Link>
			</li>

			<li>
				<a href="#">
					<img className="sibar-icon" src={CloudifyIcon}/>
					<span>Cloudify Dashboard</span>
				</a>
			</li>
			<li>
				<Link to="/alert">
					<img className="sibar-icon" src={AlertIcon}/>
					<span>Alert System</span>
				</Link>
			</li>
			<li>
				<a onClick={this.props.showCloseModal} href="#">
					<img className="sibar-icon" src={SettingsIcon}/>
					<span>Dashboards Settigns</span>
				</a>
			</li>
		</div>
	}

	showSettings(isShow) {
		this.setState({showSettings: isShow})
	}

	render() {
		return (
			<header className="main-head">
				<nav className="head-nav">
					<ul className="menu">
						<li>
							<Link>
								<img className="sibar-icon" src={UserIcon}/>
								<div className="mulitple-lines">
									<span onClick={() => {
										browserHistory.push('/user/profile')
									}}>Profile</span>
									<span onClick={this.logout.bind(this)}>Logout</span>
								</div>
							</Link>
						</li>
						{this.state.type === 'admin' ?
							<div onMouseOver={this.showSettings.bind(this, true)} onMouseLeave={this.showSettings.bind(this, false)}>
								<li>
									<Link to="/overview">
										<img className="sibar-icon" src={AdminIcon}/>
										<span>Administration</span>
									</Link>
								</li>
								{this.state.showSettings ? this.getAdministrationSettings() : null}
							</div> : null}
						<li>
							<Link to="/n2sky">
								<img className="sibar-icon" src={N2SkyIcon}/>
								<span>N2Sky Dashboard</span>
							</Link>
						</li>
						<li>
							<Link to="/n2sky/available" className="sidebar-link">
								<img className="sibar-icon" src={Networkcon}/>
								<span>Available neural networks</span>
							</Link>
						</li>
						<li>
							<Link to="/n2sky/models" className="sidebar-link">
								<img className="sibar-icon" src={ModelsIcon}/>
								<span>Models repository</span>
							</Link>
						</li>
						{/*<li>*/}
							{/*<div className="sidebar-link" onClick={this.props.showCloseNewNNModal}>*/}
								{/*<img className="sibar-icon" src={CloudCreate}/>*/}
								{/*<span>Add neural network</span>*/}
							{/*</div>*/}
						{/*</li>*/}
					</ul>
				</nav>
			</header>
		)
	}
};
