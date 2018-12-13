import React from 'react'
import {connect} from 'react-redux';
import Loader from './../../../core/loader/loader'
import AbstractAlertPopUp from './../../../core/popup/abstract-alert-popup'
import OpenStackMonitoringModal from './../../../../components/dashboards/core/modal/openstack-new-dashlet-modal'
import {train} from './../../../../actions/n2sky/neural-network-actions'
import AddIcon from './../../../../../res/img/icons/add.png'



@connect((store) => {
	return {
		model: store.neuralNetwork.success
	}
})
export default class TrainModelPopup extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			showCreateOpenstackDashlet: false,
			params : {},
			name: null
		};

		this.handleChange = ::this.handleChange;
		this.handleReqChange = ::this.handleReqChange;
		this.submitForm = ::this.submitForm;
	}


	handleChange(event) {
		this.state.params[event.target.name] = event.target.value;
	}

	handleReqChange(event) {
		this.state[event.target.name] = event.target.value;
	}


	showCloseCreateOpenstackDashletModal() {
		this.setState({
			showCreateOpenstackDashlet: !this.state.showCreateOpenstackDashlet
		})
	}


	changeValidation() {
		this.setState({
			violated: !this.state.violated
		});
	}




	submitForm() {
		this.commit()
			.then(r => {
			this.props.dispatch(train(r)).then(() => {
				location.reload();
			});
		}).catch(err => this.setState({violated: true}));

	}

	commit() {
		return new Promise((resolve, reject) => {

			let train = {
				name: this.state.name,
				descriptionId: this.props.descriptionById,
				trainedBy : localStorage.getItem("user"),
				modelParameters : this.state.params,
				endpoint : "http://192.168.0.79:2223"

			};
			resolve(train);
		})
	}



	getContent = () => {
		return (
			<form className="pure-form modal-content-container">
				<fieldset className="pure-group">
					<input type="text" name="name" onChange={this.handleReqChange} className="pure-input-1-1 full-width"
								 placeholder="Model Name"/>
				</fieldset>
				{this.props.modelParameters.map(p => {
					return <fieldset className="pure-group" key={p.parameter}>
						<input type="text" name={p.parameter} onChange={this.handleChange} className="pure-input-1-1 full-width"
									 placeholder={"Param.: " + p.parameter + " Default: " + p.defaultValue}/>
					</fieldset>

				})}


				<a onClick={this.submitForm} className="button" role="button">
					<span>Train</span>
					<div className="icon">
						<img src={AddIcon}/>
					</div>
				</a>

			</form>
		);
	};


	render() {
		return (<div>
			{this.state.violated ?
				<AbstractAlertPopUp type='warning' validation={this.changeValidation.bind(this)} title="Validation error"
														content="All fields are mandatory!"/> : null}
			<OpenStackMonitoringModal showCloseModal={this.props.showCloseModal}
																content={!this.state.loader ? this.getContent() : <Loader/>}
																title="Train a neural network"/>
		</div>)
	}
}
