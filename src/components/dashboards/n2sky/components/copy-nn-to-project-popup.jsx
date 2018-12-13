import React from 'react'
import {connect} from 'react-redux';
import Loader from './../../../core/loader/loader'
import AbstractAlertPopUp from './../../../core/popup/abstract-alert-popup'
import OpenStackMonitoringModal from './../../../../components/dashboards/core/modal/openstack-new-dashlet-modal'
import {createObject} from './../../../../actions/n2sky/project-actions'
import AddIcon from './../../../../../res/img/icons/add.png'
import {getProjectsByParams, addNNIdProject} from './../../../../actions/n2sky/project-actions'


@connect((store) => {
	return {
		projectCreate: store.projectCreate,
		projects: store.projects.projects
	}
})
export default class CopyNNToProjectPopup extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			project: null
		};

		let params = {
			static_filters: {createdBy: localStorage.getItem("user")}
		};
		this.props.dispatch(getProjectsByParams(params)).then(() => {
			console.log(this.props);
		});
		this.handleChange = ::this.handleChange;
		this.submitForm = ::this.submitForm;
	}


	handleChange(event) {
		this.setState({[event.target.name]: event.target.value});
	}


	changeValidation() {
		this.setState({
			violated: !this.state.violated
		});
	}


	submitForm() {
		this.commit()
			.then(r => {
				this.props.dispatch(addNNIdProject(r.project, r.nn_id)).then(() => {
					location.reload();
				});
			}).catch(err => {
			this.setState({violated: true});
			console.log(err);
		});

	}

	commit() {
		return new Promise((resolve, reject) => {

			let obj = {
				nn_id: {nn_id: this.props.selectedDescId},
				project: this.state.project
			};

			if(!this.props.selectedDescId || !this.state.project) {
				reject(obj)
			}
			resolve(obj);
		})
	}


	getContent = () => {
		return (
			<form className="pure-form modal-content-container">
				<fieldset className="pure-group">
					<select name='project' onChange={this.handleChange} className="combobox full-width">
						<option disabled selected value> -- select your project --</option>
						{this.props.projects && this.props.projects.length > 0 ?
							this.props.projects.map(s => {
								return <option key={s._id} name={s.name} value={s._id}>{s.name}</option>;
							}) : null}
					</select>
				</fieldset>


				<a onClick={this.submitForm} className="button" role="button">
					<span>Copy To Project</span>
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
																title="Copy network to your project"/>
		</div>)
	}
}
