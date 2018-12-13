import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router'
import Loader from './../../../core/loader/loader'
import NoOwnNNComponent from './no-own-nn-component'
import NavigationPage from '../core/navigation-page'
import LogoWhite from './../../../../../res/img/logo-white.svg'
import LogoGrey from './../../../../../res/img/logo-grey.svg'
import Enter from './../../../../../res/img/icons/right-arrow.png'
import LockedIcon from './../../../../../res/img/icons/locked.svg'
import UnlockedIcon from './../../../../../res/img/icons/unlocked.svg'
import StarColoredIcon from './../../../../../res/img/icons/star_color.svg'
import StartWhiteIcnon from './../../../../../res/img/icons/star_white.svg'
import CopyNNToProjectPopup from './copy-nn-to-project-popup'

import {
	removeCopyModelDescription
} from './../../../../actions/n2sky/neural-network-actions'
import {
	getProjectsByParams, removeNNIdProject
} from './../../../../actions/n2sky/project-actions'
import {getVinnslDescriptions} from './../../../../actions/n2sky/vinnsl_actions'


const offsetSize = 9;
const WAIT_INTERVAL = 1000;

@connect((store) => {
	return {
		descriptions: store.getDescriptionsReducer.descriptions,
		done: store.getDescriptionsReducer.done,
		projects: store.projects.projects,
		browser: store.browser

	}
})
export default class AvailableNetworksOverview extends React.Component {

	state = {
		name: null,
		domain: null,
		inputDimensions: null,
		description: null,
		isCopyPopUp: false,
		selectedDescId: null,
		networktype: null,
		problemtype: null,
		projectsId: []
	};

	constructor(props) {
		super(props);
		this.geDescriptonWithOffset = this.geDescriptonWithOffset.bind(this);
		this.handleChange = ::this.handleChange;
	}

	componentDidMount() {
		this.geDescriptonWithOffset(0, offsetSize);
	}

	geDescriptonWithOffset(from) {
		let user = localStorage.getItem("user");
		let params = {
			static_filters: {createdBy: localStorage.getItem("user")}
		};

		this.props.dispatch(getProjectsByParams(params)).then(() => {

			this.props.projects.map(pr => {
				this.setState({projectsId: this.state.projectsId.concat(pr.nn_descriptions_id)})
			});

			new Promise((res, rej) => {

				let reqParams = {};
				reqParams.static_filters = {
					"executionEnvironment.isRunning": true,
					"executionEnvironment.isPublic": true,
					"creator.name": {$ne: user}
				};
				reqParams.filters = {
					"metadata.name": this.state.name,
					"metadata.description": this.state.description,
					"problemDomain.networkType": this.state.networktype,
					"problemDomain.problemType":this.state.problemtype
					// "parameters.input.parameter" : this.state.inputDimensions
				};


				res(reqParams);
			}).then(reqParams => {
				this.props.dispatch(getVinnslDescriptions(reqParams, from, offsetSize)).then(() => {
					console.log(this.props)
				});
			});

		});
	}

	getNavbar = () => {
		return <nav className="topbar">
			<ul>
				<li><span className="no-action">Available Neural Networks</span></li>
			</ul>
		</nav>
	};

	handleChange(event) {
		clearTimeout(this.timer);

		this.setState({[event.target.name]: event.target.value});

		this.timer = setTimeout(::this.geDescriptonWithOffset(0), WAIT_INTERVAL);
	}

	handleClick() {
		clearTimeout(this.timer);

		let isRunning = !this.state.isRunning;

		this.setState({isRunning: isRunning});

		if (!isRunning) {
			this.setState({isCloudify: null});
		}
		// this.timer = setTimeout(::this.getModelsByDescId, WAIT_INTERVAL);

	}

	handleRadio(isCloudify) {
		clearTimeout(this.timer);
		this.setState({isCloudify: isCloudify});
		// this.timer = setTimeout(::this.getModelsByDescId, WAIT_INTERVAL);

	}

	getSaveButton = (d) => {

		return this.props.projects && this.state.projectsId.includes(d._id) ?
			<img onClick={this.removeCopyToUser.bind(this, d._id)} className="header-panel-icon" src={StarColoredIcon}/>
			:
			<img onClick={this.copyToUser.bind(this, d)} className="header-panel-icon" src={StartWhiteIcnon}/>
	};

	getDescription = () => {
		let style = "pure-u-1-3";
		if(this.props.browser.is.small || this.props.browser.is.extraSmall) {
			style = "pure-u-1-1";
		} else if (this.props.browser.is.medium || this.props.browser.large) {
			style = "pure-u-1-2";
		} else {
			style = "pure-u-1-3";
		}
		return this.props.descriptions.map(d => {
			return <div key={d._id} className={`${style} container-panel`}>
				<div className="container-nn">
					<div className="container-header-panel">
						{this.getSaveButton(d)}
						<img className="header-panel-icon" src={d.executionEnvironment.isPublic ? UnlockedIcon : LockedIcon}/>
						<h1>{d.metadata.name}</h1>
						{this.getRunningStatus(d.executionEnvironment.isRunning)}
					</div>
					<ul>
						<li>Description: {d.metadata.description}</li>
						<li>Application Field: {d.problemDomain.applicationField.toString()}</li>
						<li>Network Type: {d.problemDomain.networkType}</li>
						<li>Problem Type: {d.problemDomain.problemType}</li>
						<li>Created By: {d.creator.name}</li>
					</ul>
					<div>
						<Link to={"/n2sky/paradigm/nn/" + d._id} className="button" role="button">
							<span>Details and actions</span>
							<div className="icon">
								<img src={Enter}/>
							</div>
						</Link>
					</div>
				</div>
			</div>
		})
	};

	copyToUser(desc) {
		this.setState({isCopyPopUp: !this.state.isCopyPopUp, selectedDescId: desc._id})
		// desc.user = localStorage.getItem("user");
		// this.props.dispatch(copyModelDescription(desc)).then(() => {
		// 	location.reload();
		// });
	}

	removeCopyToUser(id) {
		this.props.projects.map(pr => {
			if (pr.nn_descriptions_id.includes(id)) {
				this.props.dispatch(removeNNIdProject(pr._id, {nn_id: id})).then(() => {
					location.reload();
				});
			}
		})

	}

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

	getNoOwnNN = () => {
		return <NoOwnNNComponent/>
	};

	getTableFilter = () => {
		let style = {};
		if(this.props.browser.is.small || this.props.browser.is.extraSmall) {
			style = {width: '90%'};
		} else if (this.props.browser.is.medium || this.props.browser.large) {
			style = "pure-u-1-1";
		} else {
			style = {};
		}
		return <div className="table-filter">
			<form className="pure-form">
				<fieldset>
					<input onChange={this.handleChange} style={style} name="name" type="text" placeholder="Name"/>
					<input onChange={this.handleChange} style={style} name="description" type="text" placeholder="Description"/>
					<input onChange={this.handleChange} style={style} name="networktype" type="text" placeholder="Network Type"/>
					<input onChange={this.handleChange} style={style} name="problemtype" type="text" placeholder="Problem Type"/>
				</fieldset>
			</form>
		</div>
	};

	render() {
		return (
			<div>
				{this.getNavbar()}
				{this.getTableFilter()}
				<div className="pure-g">
					{this.props.done ? this.getDescription() : <Loader/>}
				</div>
				{this.props.done && this.props.descriptions.length === 0 ? this.getNoOwnNN() : null}
				<NavigationPage chainButtonVisible={false} method={this.geDescriptonWithOffset} offsetSize={offsetSize}/>
				{this.state.isCopyPopUp ? <CopyNNToProjectPopup selectedDescId={this.state.selectedDescId}
																												showCloseModal={this.copyToUser.bind(this)}/> : null}
			</div>
		)
	}
}

