import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router'
import Loader from './../../core/loader/loader'
import DescriptionsOverview from './components/description-overview'

import CloudCreate from './../../../../res/img/icons/cloud-create.svg'
import Networkcon from './../../../../res/img/icons/network.svg'
import ModelsIcon from './../../../../res/img/icons/cube.svg'
import FolderIcon from './../../../../res/img/icons/folder.svg'
import CloudFromParadigmIcon from './../../../../res/img/icons/cloud-search.svg'
import NewDescriptionPopup from './../../dashboards/n2sky/components/new-description-popup'
import ProjectsList from './components/projects-list'
import {getCopiedDescriptions} from './../../../actions/n2sky/neural-network-actions'
import CreateProjectPopup from './components/create-project-popup'
const label_ynn = "Your Networks";
const label_y_running = "Your Running Networks";
const label_y_saved = "Saved Networks";
const label_all_networks = "All Networks";

@connect((store) => {
	return {
		savedDescriptionsByUser: store.savedDescriptionsByUser,
		modelsByDescId: store.modelsByDescId.models}
})
export default class N2SkyDashboard extends React.Component {


	constructor(props) {
		super(props);

		this.props.dispatch(getCopiedDescriptions(localStorage.getItem("user")));

		this.state = {
			activeTab: label_ynn,
			isChainMode: false,
			showNNModal: false,
			showModal: false
		};
	}


	getTabs() {
		let tabs = [label_ynn, label_y_running, label_y_saved];
		if (localStorage.getItem("user") === 'admin') {
			tabs.push(label_all_networks)
		}
		return tabs.map(ct => <li onClick={() => this.setActiveTab(ct)} key={ct}><a>{ct}</a></li>);
	}

	setActiveTab(tab) {
		this.setState({
			activeTab: tab
		})
	}

	getActiveTab() {
		if (this.state.activeTab === label_ynn) {
			let reqParams = {
				static_filters: {"creator.name": localStorage.getItem("user")}
			};
			return <DescriptionsOverview reqParams={reqParams}/>
		} else if (this.state.activeTab === label_y_running) {
			let reqParams = {
				static_filters: {
					"creator.name": localStorage.getItem("user"),
					"executionEnvironment.isRunning": true
				}
			};
			return <DescriptionsOverview reqParams={reqParams}/>
		} else if (this.state.activeTab === label_all_networks) {
			let reqParams = {};
			return <DescriptionsOverview reqParams={reqParams}/>
		} else if (this.state.activeTab === label_y_saved) {
			let reqParams = {
				static_filters: {
					_id: {$in: this.props.savedDescriptionsByUser.saved.descriptionsId}
				}
			};
			return <DescriptionsOverview reqParams={reqParams}/>

		}

	}

	getNavbar = (text) => {
		return <nav className="topbar">
			<ul>
				<li><span className="no-action">{text}</span></li>
			</ul>
		</nav>
	};


	showCloseModal() {
		this.setState({
			showModal: !this.state.showModal
		})
	}


	getToolsLinks() {
		return <div>

			<div className="pure-g admin-tools-container">
				<div className="pure-u-1-3">
					<Link to="/n2sky/available">
						<div>
							<img className="sibar-icon" src={Networkcon}/>
						</div>
						<span>Available neural networks</span>
					</Link>
				</div>
				<div className="pure-u-1-3">
					<Link to="/n2sky/models">
						<div>
							<img className="sibar-icon" src={ModelsIcon}/>
						</div>
						<span>Models repository</span>
					</Link>
				</div>
				<div className="pure-u-1-3">
					<a onClick={this.showCloseModal.bind(this)}>
						<div>
							<img className="sibar-icon" src={FolderIcon}/>
						</div>
						<span>Create new project</span>
					</a>
				</div>
			</div>
		</div>
	}

	showCloseNewNNModal() {
		this.setState({
			showNNModal: !this.state.showNNModal
		})
	}


	render() {
		return (
			<div>
				{this.getNavbar("N2Sky Dashboard")}
				{this.getToolsLinks()}
				<ProjectsList/>
				<nav className="topbar">
					<ul>
						{this.getTabs()}
					</ul>
				</nav>
				{this.state.activeTab ? this.getActiveTab() : <Loader/>}
				{this.state.showNNModal ? <NewDescriptionPopup showCloseModal={this.showCloseNewNNModal.bind(this)}/> : null}
				{this.state.showModal ?
					<CreateProjectPopup showCloseModal={this.showCloseModal.bind(this)}/> : null}
			</div>
		)
	}
}

