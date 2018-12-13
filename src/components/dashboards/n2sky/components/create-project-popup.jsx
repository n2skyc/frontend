import React from 'react'
import {connect} from 'react-redux';
import Loader from './../../../core/loader/loader'
import AbstractAlertPopUp from './../../../core/popup/abstract-alert-popup'
import OpenStackMonitoringModal from './../../../../components/dashboards/core/modal/openstack-new-dashlet-modal'
import {createObject} from './../../../../actions/n2sky/project-actions'
import AddIcon from './../../../../../res/img/icons/add.png'



@connect((store) => {
	return {
		// model: store.neuralNetwork.success
	}
})
export default class CreateProjectPopup extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			showCreateOpenstackDashlet: false,
			name: null,
			description: null
		};

		this.handleChange = ::this.handleChange;
		this.submitForm = ::this.submitForm;
	}


	handleChange(event) {
		this.setState({[event.target.name]: event.target.value});
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
			this.props.dispatch(createObject(r)).then(() => {
				location.reload();
			});
		}).catch(err => this.setState({violated: true}));

	}

	commit() {
		return new Promise((resolve, reject) => {

			let obj = {
				name: this.state.name,
				description: this.state.description,
				createdBy : localStorage.getItem("user")

			};
			resolve(obj);
		})
	}



	getContent = () => {
		return (
			<form className="pure-form modal-content-container">
				<fieldset className="pure-group">
					<input type="text" name="name" onChange={this.handleChange} className="pure-input-1-1 full-width"
								 placeholder="Project Name"/>
					<input type="text" name="description" onChange={this.handleChange} className="pure-input-1-1 full-width"
								 placeholder="Project Description"/>
				</fieldset>


				<a onClick={this.submitForm} className="button" role="button">
					<span>Create project</span>
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
																title="Create new project"/>
		</div>)
	}
}
