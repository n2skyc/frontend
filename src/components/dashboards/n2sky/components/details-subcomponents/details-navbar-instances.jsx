import React from 'react';
import {connect} from 'react-redux'
import TrainModelPopup from './../train-model-popup'

import TrainIcon from './../../../../../../res/img/icons/atomic.svg'


@connect((store) => {
	return {
	}
})
export default class DetailsNavbarInstances extends React.Component {


	state = {
		showModal: false
	};


	constructor(props) {
		super(props);
	}

	showCloseModal() {
		this.setState({
			showModal: !this.state.showModal
		})
	}


	getNavbarInstances = () => {
		return <nav className="topbar">
			<ul>
				<li><span className="no-action">Trained Models</span></li>
				<li className="right-float">
					<div className="standard-nav-item">
					<span onClick={this.showCloseModal.bind(this)} className="button" role="button">
						<span>Train a model</span>
						<div className="icon">
							<img src={TrainIcon}/>
						</div>
					</span>
					</div>
				</li>
			</ul>
		</nav>
	};


	render() {
		return (
			<div>
				{this.getNavbarInstances()}
				{this.state.showModal && this.props.descriptionById ?
					<TrainModelPopup descriptionById={this.props.descriptionById}
													 modelParameters={this.props.descriptionById.modelParameters}
													 showCloseModal={this.showCloseModal.bind(this)}/> : null}
			</div>
		)
	}
}

