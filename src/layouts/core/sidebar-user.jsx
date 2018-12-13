import React from 'react'
import {Link} from 'react-router'
import UserIcon from './../../../res/img/icons/user.svg'
import N2SkyIcon from './../../../res/img/logo-white.svg'
import CloudCreate from './../../../res/img/icons/cloud-create.svg'
import Networkcon from './../../../res/img/icons/network.svg'
import ModelsIcon from './../../../res/img/icons/cube.svg'

import {browserHistory} from 'react-router'


export default class UserSidebar extends React.Component {

	state = {
		type: localStorage.getItem("type")
	};

	logout() {
		localStorage.removeItem("user");
		browserHistory.push('/');
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
						<li>
							<div className="sidebar-link" onClick={this.props.showCloseModal}>
								<img className="sibar-icon" src={CloudCreate}/>
								<span>Add neural network</span>
							</div>
						</li>
					</ul>
				</nav>
			</header>
		)
	}
};
