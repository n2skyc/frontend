import React from 'react';
import {connect} from 'react-redux'
import TestModelPopup from './test-model-popup'
import {getModels, getModelLogs} from './../../../../actions/n2sky/vinnsl_models_actions'
import Loader from './../../../core/loader/loader'
import LogoWhite from './../../../../../res/img/logo-white.svg'
import LogoGrey from './../../../../../res/img/logo-grey.svg'
import DownloadIcon from './../../../../../res/img/icons/download.svg'
import CopyIcon from './../../../../../res/img/icons/copy.svg'
import TestIcon from './../../../../../res/img/icons/flask_white.svg'
import TrainingChart from './training-chart'
import CopyModelToProjectPopup from './copy-model-to-project-popup'
import host from './../../../../../HOST.json';

@connect((store) => {
	return {
		modelsByDescId: store.modelsByDescId.models,
		modelLogs: store.modelLogs,
		browser: store.browser
	}
})
export default class NetworkTestDetails extends React.Component {

	state = {
		showModal: false,
		chartData: [],
		isCopyPopUp: false
	};

	constructor(props) {
		super(props);
		this.props.dispatch(getModels({static_filters: {_id: this.props.params.model_id}}, 0, 999))
			.then(() => {


				if(this.props.modelsByDescId[0].isTrainingDone) {
					this.generateChartData(this.props.modelsByDescId[0].logs);
				} else {
					this.props.dispatch(getModelLogs(host.backprop_host, this.props.modelsByDescId[0]._id)).then(() => {
						this.generateChartData(this.props.modelLogs.logs);
					});
				}

			});


	}

	showCloseModal() {
		this.setState({
			showModal: !this.state.showModal
		})
	}

	getNavbar = () => {
		return <nav className="topbar">
			<ul>
				<li><a>Training results and model testing</a></li>
					<li className="right-float">
					<div style={{width: '250px'}} className="standard-nav-item">
							<span onClick={this.showCloseCopyToUser.bind(this)} className="button" role="button">
						<span>Copy this model</span>
						<div className="icon">
							<img src={CopyIcon}/>
						</div>
					</span>
					</div>
				</li>
			</ul>
		</nav>
	};

	getContent = () => {
		let style = "pure-u-1-3";
		if(this.props.browser.is.small || this.props.browser.is.extraSmall) {
			style = "pure-u-1-1";
		} else if (this.props.browser.is.medium || this.props.browser.large) {
			style = "pure-u-1-1";
		}
		return <div className="pure-g">
			{this.props.modelsByDescId[0].rawModel ? this.getRawModel(style) : null}
			{this.getParamDetails(style)}
			{this.getMainDetails(style)}
		</div>
	};

	getMainDetails = (style) => {
		return <div className={`${style} container-panel`}>
			<div className="container-nn">
				<div className="container-header-panel">
					<h1>Trained Model Details</h1>
				</div>
				<ul>
					<li>Trained By: {this.props.modelsByDescId[0].trainedBy}</li>
					<li>Trained On: {new Date(this.props.modelsByDescId[0].trainedOn).toUTCString()}</li>
					<li>Tests Count: {this.props.modelsByDescId[0].tests.length}</li>
					<li>Is Copy: {this.props.modelsByDescId[0].isCopy ? "Yes" : "No"}</li>
					<li>Is training Finished: {this.props.modelsByDescId[0].isTrainingDone ? "Trained" : "Processing"}</li>
				</ul>
			</div>
		</div>
	};

	getParamDetails = (style) => {
		return <div className={`${style} container-panel`}>
			<div className="container-nn">
				<div className="container-header-panel">
					<h1>Training parameters</h1>
				</div>
				<ul>
					{this.props.modelsByDescId[0].parameters.input.map(p => {
						return <li key={p.parameter}>{p.parameter} : {p.value}</li>
					})}
				</ul>
			</div>
		</div>
	};


	getRawModel = (style) => {
		return <div className={`${style} container-panel`}>
			<div className="container-nn">
				<div className="container-header-panel">
					<h1>RAW MODEL in JSON Format</h1>
				</div>
				<pre className="raw-model">
					{this.props.modelsByDescId[0].rawModel}
				</pre>
				<a onClick={this.download.bind(this)} className="button" role="button">
					<span>Download raw model </span>
					<div className="icon">
						<img src={DownloadIcon}/>
					</div>
				</a>
			</div>
		</div>
	};

	download() {
		let element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.props.modelsByDescId[0].rawModel));
		element.setAttribute('download', this.props.modelsByDescId[0]._id + ".txt");

		element.style.display = 'none';
		document.body.appendChild(element);

		element.click();

		document.body.removeChild(element);
	}

	getTestsNavbar = () => {
		return <nav className="topbar">
			<ul>
				<li><span className="no-action">Testing results</span></li>
				<li className="right-float">
					<div className="standard-nav-item">
					<span onClick={this.showCloseModal.bind(this)} className="button" role="button">
						<span>Test the model</span>
						<div className="icon">
							<img src={TestIcon}/>
						</div>
					</span>
					</div>
				</li>
			</ul>
		</nav>
	};

	getRow = () => {
		return this.props.modelsByDescId[0].tests.map(m => {
			return <tr key={m._id} className="pure-table">
				<td>{m.user}</td>
				<td>{m.testing_data}</td>
				<td>{m.result}</td>
				<td>{new Date(m.createdOn).toUTCString()}</td>
			</tr>
		})
	};

	getTestsTable = () => {
		return <table className="full-width pure-table">
			<thead>
			<tr>
				<th>User</th>
				<th>Testing Data</th>
				<th>Result</th>
				<th>Testing Date</th>
			</tr>
			</thead>

			<tbody>
			{this.getRow()}
			</tbody>
		</table>
	};

	generateChartData = (logs) => {
		new Promise((res, rej) => {
			let data = [];
			logs.map(d => {
				let obj = {
					x: parseInt(d.epoch),
					y: parseFloat(d.loss)
				};
				data.push(obj);
				res(data)
			})
		}).then(data => this.setState({chartData: data}));

	};

	showCloseCopyToUser() {
		this.setState({isCopyPopUp: !this.state.isCopyPopUp})
	}


	render() {
		console.log(this.props.modelsByDescId);
		return (
			<div>

				{this.props.modelsByDescId ? <div>
						{this.getNavbar()}
						{this.getContent()}
						{this.state.chartData.length > 0 ? <TrainingChart data={this.state.chartData}/> : <Loader/>}
						{this.getTestsNavbar()}
						{this.getTestsTable()}
					</div>
					: <Loader/>}
				{this.state.isCopyPopUp ? <CopyModelToProjectPopup model={this.props.modelsByDescId[0]}
																												showCloseModal={this.showCloseCopyToUser.bind(this)}/> : null}
				{this.state.showModal && this.props.modelsByDescId[0] ?
					<TestModelPopup modelName="Test the model" showCloseModal={this.showCloseModal.bind(this)} modelsByDescId={this.props.modelsByDescId[0]}/> : null}
			</div>
		)
	}
}

