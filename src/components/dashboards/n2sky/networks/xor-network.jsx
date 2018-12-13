import React from 'react';
import {connect} from 'react-redux'
import {train} from '../../../../actions/n2sky/neural-network-actions'
import Loader from './../../../core/loader/loader'
import XORIcon from './../../../../../res/img/icons/xor.svg'


@connect((store) => {
	return {
		neuralNetwork: store.neuralNetwork,
	}
})
export default class XORNetwork extends React.Component {


	state = {
	};

	constructor(props) {
		super(props);

		let requestData = {
			training_data : [[0,0],[0,1],[1,0],[1,1]],
			epoche : 100,
			target_data : [[0],[1],[1],[0]]
		};

		this.props.dispatch(train(requestData));
	}



	render() {
		return (
			<div>
				{console.log(this.props)}
			</div>
		)
	}
}

