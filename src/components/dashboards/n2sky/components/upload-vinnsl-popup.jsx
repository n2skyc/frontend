import React from 'react'
import {connect} from 'react-redux';
import Loader from './../../../core/loader/loader'
import AbstractAlertPopUp from './../../../core/popup/abstract-alert-popup'
import OpenStackMonitoringModal from './../../../../components/dashboards/core/modal/openstack-new-dashlet-modal'
import {getDockerGubUserProjects} from './../../../../actions/n2sky/dockerhub-actions'
import {uploadVinnslDescription} from './../../../../actions/n2sky/vinnsl_actions'
import {addNNIdProject} from './../../../../actions/n2sky/project-actions'
import AddIcon from './../../../../../res/img/icons/add.png'
import {browserHistory} from 'react-router'
import style from './style.scss'

const WAIT_INTERVAL = 1000;

@connect((store) => {
	return {
		vinnslCreate: store.vinnslCreate,
		dockerHub: store.dockerHub.dockerHubUser
	}
})
export default class UploadVinnslPopup extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			showCreateOpenstackDashlet: false,
			loader: false,
			violated: false,
			docker: ''
		};

		this.handleChange = ::this.handleChange;
		this.submitForm = ::this.submitForm;
		this.uploadFile = :: this.uploadFile;
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
			.then(r => {
				console.log(r);
				this.props.dispatch(uploadVinnslDescription(r)).then(() => {
					console.log(this.props);
					this.props.dispatch(addNNIdProject(this.props.projectId, {nn_id: this.props.vinnslCreate.vinnsl.id}));
					browserHistory.push('/n2sky/paradigm/nn/' + this.props.vinnslCreate.vinnsl.id);
				});
			})
			.catch(err => this.setState({violated: true}));
	}


	commit() {
		return new Promise((resolve, reject) => {

			let description = JSON.parse(document.getElementById("result").value);

			description.creator.name = localStorage.getItem('user');
			description.executionEnvironment.image.imageType = 'docker';
			description.executionEnvironment.image.details = JSON.parse(this.state.docker);

			resolve(description);
		})
	}


	parameterOnChange(event) {

		let reqToChange = JSON.parse(event.target.name);
		let params = this.state.modelParameters;
		params[reqToChange.order][reqToChange.name] = event.target.value;
		this.setState({
			modelParameters: params
		});
	}


	getContent = () => {
		return (
			<form className="pure-form modal-content-container">
				<fieldset className="pure-group">
					<div>
						<h2>Fields which will be overridden:</h2>
						<ul>
							<li>Creator: {localStorage.getItem('user')}</li>
							<li>Not running by default</li>
							<li>Image to Docker image</li>
						</ul>
					</div>
					<input type="text" name='user' onChange={this.handleChange} className="pure-input-1-1 full-width"
								 placeholder="DockerHub User Name"/>
					{this.getUserProjectsCombobox()}
					<input type="file" onChange={this.uploadFile} />
					<textarea id="result"/>
				</fieldset>
				<a onClick={this.submitForm} className="button" role="button">
					<span>Create</span>
					<div className="icon">
						<img src={AddIcon}/>
					</div>
				</a>
			</form>
		);
	};


	uploadFile = (e) => {
		this.setState({file:e.target.files[0]});

		let fr = new FileReader();
		fr.onload = function (e) {
			console.log(e);
			let result = JSON.parse(e.target.result);
			let formatted = JSON.stringify(result, null, 2);
			document.getElementById('result').value = formatted;
		};
		fr.readAsText(e.target.files[0]);
	};


	render() {
		return (<div>
			{this.state.violated ?
				<AbstractAlertPopUp type='warning' validation={this.changeValidation.bind(this)} title="Validation error"
														content="All fields are mandatory!"/> : null}
			<OpenStackMonitoringModal showCloseModal={this.props.showCloseModal}
																content={!this.state.loader ? this.getContent() : <Loader/>}
																title="Upload network in VINNSL Format"/>
		</div>)
	}
}
