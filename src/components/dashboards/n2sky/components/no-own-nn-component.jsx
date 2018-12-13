import React from 'react';
import style from './style.scss'
import ImportIcon from './../../../../../res/img/icons/add.png'
import NewDescriptionPopup from './new-description-popup'

export default class NoOwnNNComponent extends React.Component {


	constructor(props) {
		super(props);

		this.state = {
			showNNModal: false
		};
	}

	showCloseNewNNModal() {
		this.setState({
			showNNModal: !this.state.showNNModal
		})
	}

	render() {
		return (
			<div>
				<div className="no-own-nn-container">
					<div className="no-nn-content-container">
						<div className="header-label">
							<h1>You do not have any neural network yet</h1>
						</div>
						{/*<a onClick={this.showCloseNewNNModal.bind(this)} className="button" role="button">*/}
							{/*<span>Import own Network</span>*/}
							{/*<div className="icon">*/}
								{/*<img src={ImportIcon}/>*/}
							{/*</div>*/}
						{/*</a>*/}
					</div>
				</div>
				{this.state.showNNModal ? <NewDescriptionPopup showCloseModal={this.showCloseNewNNModal.bind(this)}/> : null}
			</div>
		)
	}
}

