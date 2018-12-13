import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router'
import TrainIconGrey from './../../../../../../res/img/icons/flask_grey.svg'
import {getModels} from './../../../../../actions/n2sky/vinnsl_models_actions'
import Loader from "../../../../core/loader/loader";

const WAIT_INTERVAL = 1000;

@connect((store) => {
	return {
		modelsByDescId: store.modelsByDescId.models,
		browser: store.browser

	}
})
export default class DetailsModelsTable extends React.Component {


	constructor(props) {
		super(props);
		this.state = {
			name: null,
			trainedBy: null,
			accuracy: null,
			isCopy: false,
			isTrainingDone: false,
			showAll: false
		};
		this.getModelsByDescId();
		this.handleChange = ::this.handleChange;
		this.handleClick = ::this.handleClick;
	}

	handleChange(event) {
		clearTimeout(this.timer);

		this.setState({[event.target.name]: event.target.value});

		this.timer = setTimeout(::this.getModelsByDescId, WAIT_INTERVAL);
	}

	handleClick(event) {
		clearTimeout(this.timer);
		if (event.target.name === 'isCopy') {
			this.setState({isCopy: !this.state.isCopy});
		}

		if (event.target.name === 'isTrainingDone') {
			this.setState({isTrainingDone: !this.state.isTrainingDone});
		}

		this.timer = setTimeout(::this.getModelsByDescId, WAIT_INTERVAL);

	}

	getModelsByDescId = () => {


		new Promise((res, rej) => {

			console.log(this.state);
			let static_filters = {};


			let filters = {};
			if (this.props.projectId) {
				filters = {
					name: this.state.name,
					trainedBy: this.state.trainedBy,
					accuracy: this.state.accuracy,
					isCopy: this.state.isCopy,
					isTrainingDone: this.state.isTrainingDone ? true : null,
					_id: this.props.projectId
				};
			} else if (this.props.descripIds) {
				if (!this.state.showAll) {
					static_filters.trainedBy = localStorage.getItem("user");
				}
				filters = {
					name: this.state.name,
					trainedBy: this.state.trainedBy,
					accuracy: this.state.accuracy,
					isCopy: this.state.isCopy,
					isTrainingDone: this.state.isTrainingDone ? true : null,
					vinnslDescriptionId: this.props.descripIds
				};
			} else if (this.props.setModel) {
				filters = {
					name: this.state.name,
					trainedBy: this.state.trainedBy,
					accuracy: this.state.accuracy,
					isCopy: this.state.isCopy,
					isTrainingDone: true
				};
			}

			let reqParams = {
				static_filters: static_filters,
				filters: filters
			};
			res(reqParams);
		}).then(reqParams => {
			console.log(this.props);
			this.props.dispatch(getModels(reqParams, 0, 999)).then(() => {
				console.log(this.props);
			});
		});

	};

	getTrainedModelsTalbe = () => {
		return <table className="full-width pure-table">
			<thead>
			<tr>
				<th>Trained On</th>
				<th>User</th>
				<th>Tests Amount</th>
				<th>Is Copy</th>
				<th>Status</th>
				<th>Details and Test</th>
			</tr>
			</thead>

			<tbody>
			{this.getRow()}
			</tbody>
		</table>
	};

	setModelListener(m) {
		if (this.props.setModel) {
			this.props.setModel(m);
		}
	}

	getRow = () => {
		return this.props.modelsByDescId.map(m => {
			return <tr onClick={this.setModelListener.bind(this, m)} key={m._id} className="pure-table">
				<td>{new Date(m.trainedOn).toUTCString()}</td>
				<td>{m.trainedBy}</td>
				<td>{m.tests.length}</td>
				<td>{m.isCopy ? "Yes" : "No"}</td>
				<td>{m.isTrainingDone ? "Trained" : "Processing"}</td>
				<td>
					<Link to={"/n2sky/network/" + m.vinnslDescriptionId + "/test/" + m._id} className="icon-button-container"><img
						src={TrainIconGrey}/></Link>
				</td>
			</tr>
		})
	};


	getTableFilter = () => {
		let style = {};
		if (this.props.browser.is.small || this.props.browser.is.extraSmall) {
			style = {width: '90%'};
		} else if (this.props.browser.is.medium || this.props.browser.large) {
			style = "pure-u-1-1";
		}
		return <div className="table-filter">
			<form className="pure-form">
				<fieldset>
					{/*<input onChange={this.handleChange} style={style} name="name" type="text" placeholder="Model Name"/>*/}
					<input onChange={this.handleChange} style={style} name="trainedBy" type="text" placeholder="Trained By"/>
					{/*<input onChange={this.handleChange} style={style} name="accuracy" type="text" placeholder="Accuracy"/>*/}
					<label>
						<input name="isCopy" onClick={this.handleClick} type="checkbox"/> Only Copy
					</label>
					{!this.props.setModel ?
						<label>
							<input name="isTrainingDone" onClick={this.handleClick} type="checkbox"/> Only Trained
						</label> : null}
					{(this.props.descriptionById && this.props.descriptionById.createdBy === localStorage.getItem('user')) || localStorage.getItem('type') === 'admin' ?
						<label>
							<input onClick={this.handleShowAllModels.bind(this)} type="checkbox"/> Show others models
						</label> : null}
				</fieldset>
			</form>
		</div>
	};

	handleShowAllModels() {
		clearTimeout(this.timer);
		this.setState({showAll: !this.state.showAll});
		this.timer = setTimeout(::this.getModelsByDescId, WAIT_INTERVAL);

	}

	render() {
		console.log(this.props);
		return (
			<div className="table-details">
				{this.getTableFilter()}
				{this.props.modelsByDescId ? this.getTrainedModelsTalbe() : <Loader/>}
			</div>
		)
	}
}

