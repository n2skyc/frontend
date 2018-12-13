import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router'
import style from './style.scss'

export default class FlavorDashlet extends React.Component {

	state = {
		selected: false
	};

	constructor(props) {
		super(props);
	}

	setSelected(){
		this.setState({
			selected: !this.state.selected
		})
	}

	render() {
		return (
			<material className={this.state.selected ? 'child selected' : 'child'}>
				<div className='content'>
					<div onClick={this.setSelected.bind(this)} className='title'>{this.props.flavor.name} ID: {this.props.flavor.id} RAM: {this.props.flavor.ram} Disk: {this.props.flavor.disk} GB
					</div>
					<div onClick={this.setSelected.bind(this)} className='description'>
						<ul>
						<li>ID: {this.props.flavor.id}</li>
						<li>RAM: {this.props.flavor.ram}</li>
						<li>Disk: {this.props.flavor.disk}</li>
						<li>VCPUS: {this.props.flavor.vcpus}</li>
						<li>SWAP: {this.props.flavor.swap}</li>
						</ul>
					</div>
				</div>
			</material>
		)
	}
}
