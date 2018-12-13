import React from 'react';
import {connect} from 'react-redux'
import {
	runVinnslInstanceDescription, updateVinnslDescription
} from '../../../../../../actions/n2sky/vinnsl_actions'
import StopIcon from './../../../../../../../res/img/icons/stop.svg'
import RunIcon from './../../../../../../../res/img/icons/rocket.svg'
import PrivateIcon from './../../../../../../../res/img/icons/locked.svg'
import PublicIcon from './../../../../../../../res/img/icons/unlocked.svg'
import RunInstancePopup from './run-instance-popup'

@connect((store) => {
	return {
		browser: store.browser
	}
})
export default class DetailsNavbar extends React.Component {


	state = {
		showModal: false
	};

	constructor(props) {
		super(props);
	}


	showCloseModal() {
		this.setState({
			showModal: !this.state.showModal
		})
	}

	stopInstance = () => {
		this.props.dispatch(runVinnslInstanceDescription({isRunning: false}, this.props.descriptionById._id)).then(() => {
			location.reload();
		})
	};


	getIsRunningNavBarStatus = () => {
		let style = {};
		if (this.props.browser.is.extraSmall) {
			style = {width: window.innerWidth};
		}
		return <li className="left-float">
			<div className="standard-nav-item">
				{this.props.descriptionById.executionEnvironment.isRunning ?
					<span onClick={this.stopInstance.bind(this)} style={Object.assign({backgroundColor: "#6b0202"}, style)}
								className="button"
								role="button">
						<span>STOP INSTANCE</span>
						<div className="icon">
							<img src={StopIcon}/>
						</div>
					</span>
					:
					<span onClick={this.showCloseModal.bind(this)} style={Object.assign({backgroundColor: "#3d887a"}, style)}
								className="button"
								role="button">
						<span>RUN INSTANCE</span>
						<div className="icon">
							<img src={RunIcon}/>
						</div>
					</span>
				}
			</div>
		</li>
	};

	getIsPublishNavBarStatus = () => {
		let style = {};
		// if (this.props.browser.is.extraSmall) {
		// 	style = {width: window.innerWidth};
		// }
		return <li className="right-float">
			<div className="standard-nav-item">
				{this.props.descriptionById.executionEnvironment.isPublic ?
					<span onClick={this.changePublishStatus.bind(this)} style={style} className="button" role="button">
						<span>Make Private</span>
						<div className="icon">
							<img src={PrivateIcon}/>
						</div>
					</span>
					:
					<span onClick={this.changePublishStatus.bind(this)} style={style} className="button" role="button">
						<span>Publish</span>
						<div className="icon">
							<img src={PublicIcon}/>
						</div>
					</span>}
			</div>
		</li>
	};

	changePublishStatus = () => {
		let reqParams = {
			"executionEnvironment.isPublic": !this.props.descriptionById.executionEnvironment.isPublic
		};
		this.props.dispatch(updateVinnslDescription(this.props.descriptionById._id, reqParams)).then(() => {
			location.reload();
		})
	};

	getNavbar = () => {
		console.log(this.props);
		return <nav className="topbar">
			<ul>
				{this.props.descriptionById.creator.name === localStorage.getItem('user') ? this.getIsRunningNavBarStatus() : null}
				<li>
					<span className="no-action">
						{this.props.descriptionById.metadata.name}
						/ {this.props.descriptionById.executionEnvironment.isRunning ? "Running" : "Stopped"}
						/ {this.props.descriptionById.executionEnvironment.isPublic ? "Published" : "Private"}
				</span>
				</li>
				{this.props.descriptionById.creator.name === localStorage.getItem('user') ? this.getIsPublishNavBarStatus() : null}
			</ul>
		</nav>
	};


	render() {
		return (
			<div>
				{this.getNavbar()}
				{this.state.showModal && this.props.descriptionById ?
					<RunInstancePopup descriptionById={this.props.descriptionById}
														showCloseModal={this.showCloseModal.bind(this)}/> : null}
			</div>
		)
	}
}

