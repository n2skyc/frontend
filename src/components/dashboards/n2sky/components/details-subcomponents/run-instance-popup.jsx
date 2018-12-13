import React from 'react'
import {connect} from 'react-redux';
import Loader from './../../../../core/loader/loader'
import AbstractAlertPopUp from './../../../../core/popup/abstract-alert-popup'
import OpenStackMonitoringModal from './../../../../../components/dashboards/core/modal/openstack-new-dashlet-modal'
import AddIcon from './../../../../../../res/img/icons/add.png'
import {runInstanceDescription} from './../../../../../actions/n2sky/neural-network-actions'

const N2SY = 'n2sky';
const OWN = 'own';

@connect((store) => {
	return {}
})
export default class RunInstancePopup extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			loader: false,
			violated: false,
			deployment: null,
			endpoint: null
		};

		this.submitForm = ::this.submitForm;
		this.handleChange = ::this.handleChange;
	}

	showCloseCreateOpenstackDashletModal() {
		this.setState({
			showCreateOpenstackDashlet: !this.state.showCreateOpenstackDashlet
		})
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
				this.props.dispatch(runInstanceDescription(r, this.props.descriptionById._id)).then(() => {
					location.reload();
				});
			})
			.catch(err => this.setState({violated: true}));
	}


	commit() {
		return new Promise((resolve, reject) => {

			let reqParams = {};

			if (this.state.deployment === N2SY) {
				reqParams = {
					isRunning: true,
					isCloudify: true
				};
			} else {
				if (!this.state.endpoint) {
					reject(reqParams)
				}
				reqParams = {
					isRunning: true,
					isCloudify: false,
					endpoint: this.state.endpoint
				};
			}
			resolve(reqParams);
		})
	}


	changeDeployment = (type) => {
		this.setState({deployment: type});
	};


	getDeployChoiceRadio = () => {
		return <div>
			<label className="pure-radio">
				<input onClick={this.changeDeployment.bind(this, N2SY)} id="option-two" type="radio" name="optionsRadios"
							 value={N2SY}/>
				Deploy on N2Sky environment
			</label>

			<label className="pure-radio">
				<input onClick={this.changeDeployment.bind(this, OWN)} id="option-three" type="radio" name="optionsRadios"
							 value={OWN}/>
				Instance already deployed on external environment
			</label>
		</div>
	};


	getDeployOnN2skyForm = () => {

	};

	getDeployOnOwnMachine = () => {
		return <fieldset className="pure-group">
			<input type="text" name='endpoint' onChange={this.handleChange} className="pure-input-1-1 full-width"
						 placeholder="Endpoint of you neural network"/>

			{this.state.endpoint ? <table className="pure-table full-width">

				<tbody>
				<tr>
					<td>Endpoint for training</td>
					<td>{this.state.endpoint}/train</td>
				</tr>
				<tr>
					<td>Endpoint for testing</td>
					<td>{this.state.endpoint}/test</td>
				</tr>
				</tbody>
			</table> : null}
		</fieldset>
	};


	getContent = () => {
		return (
			<form className="pure-form modal-content-container">
				{this.getDeployChoiceRadio()}

				{this.state.deployment === N2SY ? this.getDeployOnN2skyForm() : null}
				{this.state.deployment === OWN ? this.getDeployOnOwnMachine() : null}

				<a onClick={this.submitForm} className="button" role="button">
					<span>Run Instance</span>
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
																title="Run instance"/>
		</div>)
	}
}
