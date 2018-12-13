import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router'
import Loader from './../../../core/loader/loader'
import NoOwnNNComponent from './no-own-nn-component'
import NavigationPage from '../core/navigation-page'
import DetailsModelsTable from './details-subcomponents/details-models-tabel'
import LogoWhite from './../../../../../res/img/logo-white.svg'
import LogoGrey from './../../../../../res/img/logo-grey.svg'
import Enter from './../../../../../res/img/icons/right-arrow.png'
import LockedIcon from './../../../../../res/img/icons/locked.svg'
import UnlockedIcon from './../../../../../res/img/icons/unlocked.svg'


import {getVinnslDescriptions} from './../../../../actions/n2sky/vinnsl_actions'

const offsetSize = 3;


@connect((store) => {
	return {
		descriptions: store.getDescriptionsReducer.descriptions,
		done: store.getDescriptionsReducer.done,
		browser: store.browser
	}
})
export default class DescriptionsOverview extends React.Component {

	state = {
		descripIds: null,
		chained: false
	};

	constructor(props) {
		super(props);
		this.geDescriptonWithOffset = this.geDescriptonWithOffset.bind(this);

	}

	componentDidMount() {
		this.geDescriptonWithOffset(0);
	}

	componentWillReceiveProps(nextProps) {
		if (JSON.stringify(this.props.reqParams) !== JSON.stringify(nextProps.reqParams)) {
			this.setState({descripIds: null});
			this.geDescriptonWithOffset(0, nextProps.reqParams);
		}
	}

	geDescriptonWithOffset(from, reqParams = this.props.reqParams) {
		this.props.dispatch(getVinnslDescriptions(
			reqParams,
			from,
			offsetSize)).then(() => {
			this.getDescriptionIds();
		});
	}

	getDescriptionIds = (id = null) => {

		new Promise((resolve, reject) => {
			this.setState({descripIds: null});
			resolve(this.state);
		}).then(r => {
			if (id && this.state.chained) {
				this.setState({descripIds: new Array(id)});
			} else {
				let descripIds = [];
				this.props.descriptions.map(desc => descripIds.push(desc._id));
				this.setState({descripIds: descripIds});
			}
		})
			.catch(err => this.setState({violated: true}));


	};


	getModelModeListener = () => {
		let newStatus = !this.state.chained;
		if (newStatus) {
			this.setState({descripIds: null})
		} else {
			this.getDescriptionIds();
		}
		this.setState({chained: newStatus})
	};


	getDescription = () => {
		let style = "pure-u-1-3";
		if(this.props.browser.is.small || this.props.browser.is.extraSmall) {
			 style = "pure-u-1-1";
		} else if (this.props.browser.is.medium || this.props.browser.large) {
			style = "pure-u-1-2";
		}
		let chainStyle = this.state.chained ? {cursor: 'pointer'} : {};
		return this.props.descriptions.map(d => {
			console.log(d);
			return <div style={chainStyle} onClick={this.getDescriptionIds.bind(this, d._id)} key={d._id} className={`container-panel ${style}`}>
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

	getNoOwnNN = () => {
		return <NoOwnNNComponent/>
	};


	render() {
		console.log(this.state);
		return (
			<div>
				{this.props.done && this.props.descriptions.length === 0 ? this.getNoOwnNN() :
					<div>
						<div className="pure-g">
							{this.props.done ? this.getDescription() : <Loader/>}
						</div>
						<NavigationPage chainButtonVisible={true} chained={this.state.chained}
														getModelModeListener={this.getModelModeListener.bind(this)}
														method={this.geDescriptonWithOffset} offsetSize={offsetSize}/>
						{this.state.descripIds ? <DetailsModelsTable descripIds={this.state.descripIds}/> : <Loader/>}
					</div>
				}
			</div>
		)
	}
}

