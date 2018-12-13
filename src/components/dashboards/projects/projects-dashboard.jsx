import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router'
import Loader from './../../core/loader/loader'
import {browserHistory} from 'react-router'

import DetailsModelsTable from './../n2sky/components/details-subcomponents/details-models-tabel'
import CloudCreate from './../../../../res/img/icons/cloud-create.svg'
import Networkcon from './../../../../res/img/icons/network.svg'
import ModelsIcon from './../../../../res/img/icons/cube.svg'
import CloudFromParadigmIcon from './../../../../res/img/icons/cloud-search.svg'
import {getProjectById, deleteProjectById} from './../../../actions/n2sky/project-actions'
import UploadVinnslPopup from './../n2sky/components/upload-vinnsl-popup'
import Enter from './../../../../res/img/icons/right-arrow.png'
import LockedIcon from './../../../../res/img/icons/locked.svg'
import UnlockedIcon from './../../../../res/img/icons/unlocked.svg'
import LogoWhite from './../../../../res/img/logo-white.svg'
import LogoGrey from './../../../../res/img/logo-grey.svg'
import RemoveIcon from './../../../../res/img/icons/delete.svg'

@connect((store) => {
	return {
		projects: store.projects.projects,
		browser: store.browser
	}
})
export default class ProjectDashboard extends React.Component {


	constructor(props) {
		super(props);

		this.props.dispatch(getProjectById(this.props.params.id)).then(() => {
			console.log(this.props);
		});

		this.state = {
			showNNModal: false,
		};
	}


	getNavbar = (text, isDelete) => {
		return <nav className="topbar">
			<ul>
				<li><span className="no-action">{text}</span></li>
				{isDelete ? <li className="right-float">
					<div className="standard-nav-item">
							<span onClick={this.deleteProject.bind(this)} className="button" role="button">
						<span>Delete</span>
						<div className="icon">
							<img src={RemoveIcon}/>
						</div>
					</span>
					</div>
				</li> : null}
			</ul>
		</nav>
	};

	deleteProject = () => {
		this.props.dispatch(deleteProjectById(this.props.params.id)).then(() => {
			console.log(this.props);
			browserHistory.push('/n2sky')
		});
	};


	showCloseNewNNModal() {
		this.setState({
			showNNModal: !this.state.showNNModal
		})
	}


	getToolsLinks() {
		let style = "pure-u-1-4";
		if(this.props.browser.is.small || this.props.browser.is.extraSmall) {
			style = "pure-u-1-2";
		} else if (this.props.browser.is.medium || this.props.browser.large) {
			style = "pure-u-1-4";
		}
		return <div>

			<div className="pure-g admin-tools-container">
				<div className={style}>
					<Link to="/n2sky/available">
						<div>
							<img className="sibar-icon" src={Networkcon}/>
						</div>
						<span>Available neural networks</span>
					</Link>
				</div>
				<div className={style}>
					<Link to="/n2sky/models">
						<div>
							<img className="sibar-icon" src={ModelsIcon}/>
						</div>
						<span>Models repository</span>
					</Link>
				</div>
				<div className={style}>
					<Link to={'/n2sky/paradigm/create/' + this.props.params.id}>
						<div>
							<img className="sibar-icon" src={CloudFromParadigmIcon}/>
						</div>
						<span>Add neural network from paradigm</span>
					</Link>
				</div>
				{/*<div className="pure-u-1-4">*/}
				{/*<a onClick={this.showCloseNewNNModal.bind(this)}>*/}
				{/*<div>*/}
				{/*<img className="sibar-icon" src={CloudCreate}/>*/}
				{/*</div>*/}
				{/*<span>Add neural network from scratch</span>*/}
				{/*</a>*/}
				{/*</div>*/}
				<div className={style}>
					<a onClick={this.showCloseNewNNModal.bind(this)}>
						<div>
							<img className="sibar-icon" src={CloudCreate}/>
						</div>
						<span>Upload own network in ViNNSL format</span>
					</a>
				</div>
			</div>
		</div>
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

	getNeuralNetworks = () => {
		let style = "pure-u-1-3";
		if(this.props.browser.is.small || this.props.browser.is.extraSmall) {
			style = "pure-u-1-1";
		} else if (this.props.browser.is.medium || this.props.browser.large) {
			style = "pure-u-1-2";
		}
		return <div className="pure-g">
			{this.props.projects.nns.map(d => {
				return <div key={d._id} className={`container-panel ${style}`}>
					<div className="container-nn">
						<div className="container-header-panel">
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
			}
		</div>
	};


	render() {
		console.log(this.props);
		return (
			<div>
				{this.props.projects ?
					<div>
						{this.getNavbar("Project: " + this.props.projects.name, true)}
						{this.getToolsLinks()}
						{this.props.projects.nns ?
							<div>
								{this.getNavbar("Neural networks", false)}
								{this.getNeuralNetworks()}
							</div>
							: null}
						{this.props.projects.nn_models_id ?
							<div>
								{this.getNavbar("Saved Models", false)}
								<DetailsModelsTable projectId={this.props.projects.nn_models_id}/>
							</div>
							: null}

						{this.state.showNNModal ?
							<UploadVinnslPopup projectId={this.props.params.id} showCloseModal={this.showCloseNewNNModal.bind(this)}/> : null}
					</div> : <Loader/>}
			</div>
		)
	}
}

