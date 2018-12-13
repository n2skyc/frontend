import React from 'react'
import {connect} from 'react-redux';
import Loader from './../../../core/loader/loader'
import AbstractAlertPopUp from './../../../core/popup/abstract-alert-popup'
import OpenStackMonitoringModal from './../../../../components/dashboards/core/modal/openstack-new-dashlet-modal'
import {getDockerGubUserProjects} from './../../../../actions/n2sky/dockerhub-actions'
import {saveModelDescription} from './../../../../actions/n2sky/neural-network-actions'
import AddIcon from './../../../../../res/img/icons/add.png'


const WAIT_INTERVAL = 1000;

@connect((store) => {
	return {
		dockerHub: store.dockerHub.dockerHubUser
	}
})
export default class NewDescriptionPopup extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			showCreateOpenstackDashlet: false,
			loader: false,
			violated: false,
			user: '',
			name: '',
			docker: '',
			domain: '',
			inputType: '',
			inputDimensions: '',
			modelParameters: [
				{
					parameter: '',
					defaultValue: ''
				}
			]
		};

		this.handleChange = ::this.handleChange;
		this.parameterOnChange = ::this.parameterOnChange;
		this.submitForm = ::this.submitForm;
	}


	componentWillMount() {
		this.timer = null;
	}


	handleChange(event) {
		clearTimeout(this.timer);

		this.setState({[event.target.name]: event.target.value});

		this.timer = setTimeout(::this.getDockerHubUserProjects, WAIT_INTERVAL);
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

	getDockerHubUserProjects = () => {
		this.props.dispatch(getDockerGubUserProjects(this.state.user)).then(() => {
		})
	};

	getUserProjectsCombobox() {
		return (<select name='docker' disabled={!this.props.dockerHub}
										onChange={this.handleChange} className="combobox full-width">
			<option disabled selected value> -- select the project --</option>
			{this.props.dockerHub ? this.props.dockerHub.results.map(s => {
				let v = s.user + "/" + s.name;
				return <option key={s.name} id={s.name} name={s.name} value={JSON.stringify(s)}>{v}</option>;
			}) : null}
		</select>);
	}

	submitForm() {
	this.commit()
		.then(r => this.hasNull(r))
		.then(r => {
			this.props.dispatch(saveModelDescription(r)).then(() => {
				location.reload();
			});
		})
		.catch(err => this.setState({violated: true}));
	}

	hasNullArray(target) {
		return new Promise((resolve, reject) => {
			target.modelParameters.map(p => {
				if (this.hasNull(p)) {
					reject(true)
				}
			});
			resolve(target);
		})

	}


	hasNull(target) {
		return new Promise((resolve, reject) => {
			for (let member in target) {
				if (target[member] === null || target[member] === '') {
					reject(member);
				}
			}
			resolve(target);
		})
	}

	commit() {
		return new Promise((resolve, reject) => {

			let description = {
				user: localStorage.getItem('user'),
				name: this.state.name,
				docker: this.state.docker,
				domain: this.state.domain,
				inputType: this.state.inputType,
				inputDimensions: this.state.inputDimensions,
				modelParameters: this.state.modelParameters
			};
			resolve(description);
		})
	}


	getParameters = () => {
		let count = 0;
		return <fieldset className="pure-group">
			{this.state.modelParameters.map(p => {
				let parameter = JSON.stringify({order: count, name: "parameter"});
				let defaultValue = JSON.stringify({order: count, name: "defaultValue"});
				count++;
				return (
					<div key={count}>
						<input onChange={this.parameterOnChange} name={parameter} type="text"
									 className="pure-input-1-2 half-width simple-input" placeholder="Input Parameters"/>
						<input onChange={this.parameterOnChange} name={defaultValue} type="text"
									 className="pure-input-1-2 half-width simple-input" placeholder="Default Value"/>
					</div>
				)
			})
			}
		</fieldset>
	};

	parameterOnChange(event) {

		let reqToChange = JSON.parse(event.target.name);
		let params = this.state.modelParameters;
		params[reqToChange.order][reqToChange.name] = event.target.value;
		this.setState({
			modelParameters: params
		});
	}

	addNewParameter = () => {
		let emptyParameter = {
			parameter: '',
			defaultValue: ''
		};

		this.setState({
			modelParameters: this.state.modelParameters.concat(emptyParameter)
		})
	};


	getContent = () => {
		return (
			<form className="pure-form modal-content-container">
				<fieldset className="pure-group">
					<input type="text" name='name' onChange={this.handleChange} className="pure-input-1-1 full-width"
								 placeholder="Neural Network Name"/>
					<input type="text" name='user' onChange={this.handleChange} className="pure-input-1-1 full-width"
								 placeholder="DockerHub User Name"/>
					{this.getUserProjectsCombobox()}
					<input type="text" name='domain' onChange={this.handleChange} className="pure-input-1-1 full-width"
								 placeholder="Domain"/>
					<input type="text" name='inputType' onChange={this.handleChange} className="pure-input-1-1 full-width"
								 placeholder="Input Type"/>
					<input type="text" name='inputDimensions' onChange={this.handleChange} className="pure-input-1-1 full-width"
								 placeholder="Input Dimensions"/>

				</fieldset>
				<div className="dashlet-header">
					<label className="left-side">Model Parameters</label>
					<div onClick={this.addNewParameter.bind(this)} className="right-side additional-field"><label>Add
						parameter</label><img src={AddIcon}/></div>
				</div>

				{this.getParameters()}


				<a onClick={this.submitForm} className="button" role="button">
					<span>Create</span>
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
																title="Create new model Description"/>
		</div>)
	}
}
