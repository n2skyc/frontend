import React from 'react';
import {connect} from 'react-redux'


import Loader from './../../../../core/loader/loader'

import DetailsNavbar from './details-subcomponents/details-navbar'
import TrainingForm from './details-subcomponents/training-form'


export default class NNTraining extends React.Component {


	constructor(props) {
		super(props);
	}


	render() {
		return (
			<div>
				<DetailsNavbar descriptionById={this.props.description}/>
				<TrainingForm descriptionById={this.props.description}/>
			</div>
		)
	}
}

