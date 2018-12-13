import React from 'react'
import {connect} from 'react-redux';
import Loader from './../../../../core/loader/loader'
import AbstractAlertPopUp from './../../../../core/popup/abstract-alert-popup'
import OpenStackMonitoringModal from './../../../../../components/dashboards/core/modal/openstack-new-dashlet-modal'
import {train, getDescriptionById} from './../../../../../actions/n2sky/neural-network-actions'
import AddIcon from './../../../../../../res/img/icons/add.png'


@connect((store) => {
	return {
		model: store.neuralNetwork.success,
		descriptionById: store.descriptionById.description
	}
})
export default class CopyModelPopup extends React.Component {

	constructor(props) {
		super(props);

		this.props.dispatch(getDescriptionById(this.props.modelCopy.descriptionId)).then(() => {
			this.setDefaultValues();
		});


		this.state = {
			showCreateOpenstackDashlet: false,
			params: {},
			name: null
		};

		this.handleChange = ::this.handleChange;
		this.handleReqChange = ::this.handleReqChange;
		this.submitForm = ::this.submitForm;
	}


	handleChange(event) {
		console.log(event.target.value);
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
			}).catch(err => { console.log(err); this.setState({violated: true}) } );

	}

	commit() {
		return new Promise((resolve, reject) => {

			let train = {
				name: this.state.name,
				descriptionId: this.props.modelCopy.descriptionId,
				trainedBy: localStorage.getItem("user"),
				modelParameters: this.state.params,
				endpoint: "http://192.168.0.79:2223",
				copiedFromModelId: this.props.modelCopy._id,
				isCopy: true
			};

			console.log(train);

			resolve(train);
		})
	}

	setDefaultValues = () => {

		this.props.descriptionById.modelParameters.map(p => {
			this.state.params[p.parameter] = this.props.modelCopy.modelParameters[p.parameter];
		});

		this.state.name = this.props.modelCopy.name;

		console.log(this.state);

	};

	getContent = () => {
		return (
			<form className="pure-form modal-content-container">
				<fieldset className="pure-group">
					<input type="text" name="name" onChange={this.handleReqChange} className="pure-input-1-1 full-width"
								 placeholder="Model Name" defaultValue={this.props.modelCopy.name + " : Copy"}/>
				</fieldset>
				{this.props.descriptionById.modelParameters.map(p => {
					return <fieldset className="pure-group" key={p.parameter}>
						<input type="text" name={p.parameter} onChange={this.handleChange} className="pure-input-1-1 full-width" defaultValue={this.props.modelCopy.modelParameters[p.parameter]}
									 placeholder={"Param.: " + p.parameter + " Default: " + p.defaultValue} />
					</fieldset>

				})}

				<a onClick={this.submitForm} className="button" role="button">
					<span>Copy and Train</span>
					<div className="icon">
						<img src={AddIcon}/>
					</div>
				</a>

			</form>
		);
	};


	render() {
		console.log(this.props.modelCopy)
		return (<div>
			{this.state.violated ?
				<AbstractAlertPopUp type='warning' validation={this.changeValidation.bind(this)} title="Validation error"
														content="All fields are mandatory!"/> : null}
			{this.props.descriptionById ? <OpenStackMonitoringModal showCloseModal={this.props.showCloseModal}
																															content={!this.state.loader ? this.getContent() :
																																<Loader/>}
																															title="Train a neural network"/> : <Loader/>}
		</div>)
	}
}
