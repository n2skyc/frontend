import React from 'react';
import FlavorDashboard from './../flavor-dashboard'
import ServerDashboard from './../server-dashboard'

export default class ComputeDashboard extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<ServerDashboard id={this.props.id}/>
				<FlavorDashboard id={this.props.id}/>
			</div>
		)
	}

}
