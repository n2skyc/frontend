import React from 'react';
import {connect} from 'react-redux'
import {
	getDescriptionById,
} from '../../../../actions/n2sky/neural-network-actions'
import Loader from './../../../core/loader/loader'

import DetailsNavbar from './details-subcomponents/details-navbar'
import DetailsNavbarInstances from './details-subcomponents/details-navbar-instances'
import DetailsModelsTable from './details-subcomponents/details-models-tabel'
import DetailsContent from './details-subcomponents/details-content'

@connect((store) => {
	return {
		descriptionById: store.descriptionById.description
	}
})
export default class NetworkDetails extends React.Component {


	state = {
		descripIds: null
	};

	constructor(props) {
		super(props);
		this.props.dispatch(getDescriptionById(this.props.params.id));
	}


	render() {
		return (
			<div>
				{this.props.descriptionById ? <DetailsNavbar descriptionById={this.props.descriptionById}/> : null}
				{this.props.descriptionById ? <DetailsContent descriptionById={this.props.descriptionById}/> : <Loader/>}
				{this.props.descriptionById ? <DetailsNavbarInstances descriptionById={this.props.descriptionById}/> : null}
				{this.props.descriptionById ? <DetailsModelsTable descriptionById={this.props.descriptionById} descripIds={new Array(this.props.params.id)}/> : <Loader/>}

			</div>
		)
	}
}

