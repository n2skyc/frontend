import React from 'react';
import {connect} from 'react-redux'
import LogoWhite from './../../../../../../res/img/logo-white.svg'
import LogoGrey from './../../../../../../res/img/logo-grey.svg'
import CheckIcon from './../../../../../../res/img/icons/tick-inside-circle.svg'
import VinnslIcon from './../../../../../../res/img/icons/coding_xml.svg'
import GenerateVinnnslPopup from './generate-vinnsl-popup'

import style from './style.scss'

@connect((store) => {
	return {}
})
export default class DetailsContent extends React.Component {


	state = {
		showModal: false
	};

	constructor(props) {
		super(props);
	}


	getMainDetails = () => {
		return <div className="container-panel pure-u-1-3">
			<div className="container-nn">
				<div className="container-header-panel">
					<h1>{this.props.descriptionById.name}</h1>
					{this.getRunningStatus(this.props.descriptionById.isRunning)}
				</div>
				<ul>
					<li>Owner: {this.props.descriptionById.createdBy}</li>
					<li>Created On: {this.props.descriptionById.createdOn}</li>
					<li>Domain: {this.props.descriptionById.domain}</li>
					<li>Input Dimentions: {this.props.descriptionById.inputDimensions}</li>
					<li>Input Type: {this.props.descriptionById.inputType}</li>
				</ul>
				<a onClick={this.showCloseModal.bind(this)} className="button" role="button">
					<span>Generate ViNNSL Model</span>
					<div className="icon">
						<img src={VinnslIcon}/>
					</div>
				</a>
			</div>
		</div>
	};

	getParamDetails = () => {
		return <div className="container-panel pure-u-1-3">
			<div className="container-nn">
				<div className="container-header-panel">
					<h1>Model Parameters / Default Values</h1>
				</div>
				<ul>
					{this.props.descriptionById.modelParameters.map(p => {
						return <li key={p._id}>{p.parameter} : {p.defaultValue}</li>
					})}
				</ul>
			</div>
		</div>
	};

	getRunningStatus = (isRunning) => {
		if (isRunning) {
			return <div className="is-running-header">

				<h1>Running</h1>
				<img id="spin" src={LogoWhite}/>
			</div>
		} else {
			return <div className="is-running-header">
				<h1>Not Running</h1>
				<img src={LogoGrey}/>
			</div>
		}
	};


	getDockerDetails = () => {
		return <div className="container-panel pure-u-1-3">
			<div className="container-nn">
				<div className="container-header-panel">
					<h1>Docker Image</h1>
				</div>
				<ul>
					<li> Name: {this.props.descriptionById.docker.name}</li>
					<li> User: {this.props.descriptionById.docker.user}</li>
					<li> Namespace: {this.props.descriptionById.docker.namespace}</li>
					<li> Description: {this.props.descriptionById.docker.description}</li>
					<li> Last Updated: {this.props.descriptionById.docker.last_updated}</li>
				</ul>
			</div>
		</div>
	};

	getContent = () => {
		return <div className="pure-g">
			{this.getMainDetails()}
			{this.getParamDetails()}
			{this.getDockerDetails()}
		</div>
	};

	getIsRunningheaderStatus = () => {
		console.log(this.props.descriptionById);
		return <div className='header-nn-details'>
			{this.props.descriptionById.isCloudify ? <div><h1>Neural network deployed on N2Sky</h1></div>
				: <div><h1>Neural network deployed on external environment</h1></div>}
			<div>
				<table className="pure-table full-width">

					<tbody>
					<tr>
						<td>Endpoint for training</td>
						<td>{this.props.descriptionById.endpoint}/train</td>
						<td><a className="button" role="button">
							<span>Check</span>
							<div className="icon">
								<img src={CheckIcon}/>
							</div>
						</a></td>
					</tr>
					<tr>
						<td>Endpoint for testing</td>
						<td>{this.props.descriptionById.endpoint}/test</td>
						<td><a className="button" role="button">
							<span>Check</span>
							<div className="icon">
								<img src={CheckIcon}/>
							</div>
						</a></td>
					</tr>
					</tbody>
				</table>
			</div>
		</div>
	};

	showCloseModal() {
		this.setState({
			showModal: !this.state.showModal
		})
	}

	render() {
		return (
			<div>
				{this.props.descriptionById.isRunning ? this.getIsRunningheaderStatus() : null}
				{this.getContent()}
				{this.state.showModal && this.props.descriptionById ?
					<GenerateVinnnslPopup descriptionById={this.props.descriptionById}
														showCloseModal={this.showCloseModal.bind(this)}/> : null}
			</div>
		)
	}
}

