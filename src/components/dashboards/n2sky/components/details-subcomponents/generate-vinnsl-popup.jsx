import React from 'react'
import {connect} from 'react-redux';
import Loader from './../../../../core/loader/loader'
import AbstractAlertPopUp from './../../../../core/popup/abstract-alert-popup'
import OpenStackMonitoringModal from './../../../../../components/dashboards/core/modal/openstack-new-dashlet-modal'
import AddIcon from './../../../../../../res/img/icons/add.png'
import {generateVinnslByDescripId} from './../../../../../actions/n2sky/neural-network-actions'

@connect((store) => {
	return {
		vinnsl: store.vinnsl
	}
})
export default class GenerateVinnnslPopup extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			loader: false,
			violated: false
		};

		this.props.dispatch(generateVinnslByDescripId(this.props.descriptionById._id)).then(() => {
			console.log(this.props);
		});


	}


	getContent = () => {
		return (
			<form className="pure-form modal-content-container">

				<pre className="xml-pretty">
					{this.props.vinnsl.vinnsl}
				</pre>


				<a onClick={this.download.bind(this)} className="button" role="button">
					<span>Download ViNNSL Model</span>
					<div className="icon">
						<img src={AddIcon}/>
					</div>
				</a>

			</form>
		);
	};

	download() {
		let element = document.createElement('a');
		element.setAttribute('href', 'data:Application/octet-stream,' + encodeURIComponent(this.props.vinnsl.vinnsl));
		element.setAttribute('download', this.props.descriptionById.name + ".xml");

		element.style.display = 'none';
		document.body.appendChild(element);

		element.click();

		document.body.removeChild(element);
	}

	showCloseModal() {
		this.setState({
			showModal: !this.state.showModal
		})
	}

	render() {
		return (<div>
			{this.state.violated ?
				<AbstractAlertPopUp type='warning' validation={this.changeValidation.bind(this)} title="Validation error"
														content="All fields are mandatory!"/> : null}
			{this.props.vinnsl.done ? <OpenStackMonitoringModal showCloseModal={this.props.showCloseModal}
																content={!this.state.loader ? this.getContent() : <Loader/>}
																title="ViNNSL Model"/> : <Loader/>}
		</div>)
	}
}
