import React from 'react'
import {Link} from 'react-router'
import CloudCreate from './../../../res/img/icons/cloud-create.svg'
import Networkcon from './../../../res/img/icons/network.svg'


import {browserHistory} from 'react-router'


export default class UserN2SkySidebar extends React.Component {

	state = {
		type: localStorage.getItem("type")
	};

	logout() {
		localStorage.removeItem("user");
		browserHistory.push('/');
	}

	render() {
		return (
			<header className="main-head main-head-right">
				<nav className="head-nav">
					<ul className="menu">
						<li>
							<Link to="/n2sky/available" className="sidebar-link">
								<img className="sibar-icon" src={Networkcon}/>
								<span>Available neural networks</span>
							</Link>
						</li>
						<li>
							<div className="sidebar-link" onClick={this.props.showCloseModal}>
								<img className="sibar-icon" src={CloudCreate}/>
								<span>Add neural network</span>
							</div>
						</li>
						{/*<li>*/}
							{/*<Link>*/}
								{/*<img className="sibar-icon" src={UserIcon}/>*/}
								{/*<div className="mulitple-lines">*/}
									{/*<span onClick={() => {*/}
										{/*browserHistory.push('/user/profile')*/}
									{/*}}>Profile</span>*/}
									{/*<span onClick={this.logout.bind(this)}>Logout</span>*/}
								{/*</div>*/}
							{/*</Link>*/}
						{/*</li>*/}
					</ul>
				</nav>
			</header>
		)
	}
};
