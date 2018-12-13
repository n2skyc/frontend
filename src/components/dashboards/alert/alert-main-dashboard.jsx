import React from 'react';
import {connect} from 'react-redux'
import Loader from './../../core/loader/loader'
import AlertsComponent from './alerts-component'

@connect((store) => {
	return {

	}
})
export default class AlertDashboard extends React.Component {


	constructor(props) {
		super(props);
		this.state = {
		};
	}


	render() {
		return (
			<div>
				<AlertsComponent/>
				{/*<Loader/>*/}
			</div>
		)
	}
}

