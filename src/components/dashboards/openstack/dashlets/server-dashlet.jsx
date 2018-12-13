import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router'
import SuccessIcon from './../../../../../res/img/icons/success.svg'
import MultiplyIcon from './../../../../../res/img/icons/multiply.svg'
import Enter from './../../../../../res/img/icons/right-arrow.png'

import style from './style.scss'

export default class ServerDashlet extends React.Component {

	state = {
		selected: false
	};

	constructor(props) {
		super(props);
	}

	setSelected() {
		this.setState({
			selected: !this.state.selected
		})
	}

	getIpAdresses() {
		return this.props.server.addresses.public.map(ip => {
			return <div key={ip.addr} className="info-header-item"> IP Address: {ip.addr}, type: {ip["OS-EXT-IPS:type"]}</div>
		});
	}

	getStatus() {
		let img = null;
		if (this.props.server.status === "ACTIVE") {
			img = <img src={SuccessIcon} className="icon-dashlet"/>;
		} else {
			img = <img src={MultiplyIcon} className="icon-dashlet"/>;
		}
		return <div className="info-header-item"> {img} Status: {this.props.server.status}</div>
	}

	render() {
		return (
			<material className={this.state.selected ? 'child selected' : 'child'}>
				<div>
					<div onClick={this.setSelected.bind(this)} className="title">
						<div className='title-header'>{this.props.server.name}</div>
						{this.getStatus()}
						{this.getIpAdresses()}
						<div className="info-header-item">Flavor ID: {this.props.server.flavor.id}</div>
						<div className="info-header-item">ID: {this.props.server.id} </div>
						<div className="info-header-item">Updated: {this.props.server.updated}</div>
						<Link to={"/openstack/server/" + this.props.server.tenant_id + "/" + this.props.server.id} className="button" role="button">
							<span>Server Details</span>
							<div className="icon">
								<img src={Enter}/>
							</div>
						</Link>
					</div>
				</div>
			</material>
		)
	}
}
