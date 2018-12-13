import React from 'react';
import {connect} from 'react-redux'
import {
	updateDescription,
	stopInstanceDescription
} from '../../../../../actions/n2sky/neural-network-actions'
import StopIcon from './../../../../../../res/img/icons/stop.svg'
import RunIcon from './../../../../../../res/img/icons/rocket.svg'
import PrivateIcon from './../../../../../../res/img/icons/locked.svg'
import PublicIcon from './../../../../../../res/img/icons/unlocked.svg'
import RunInstancePopup from './run-instance-popup'

@connect((store) => {
	return {}
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
		this.props.dispatch(stopInstanceDescription({}, this.props.descriptionById._id)).then(() => {
			location.reload();
		})
	};


	getIsRunningNavBarStatus = () => {
		return <li className="left-float">
			<div className="standard-nav-item">
				{this.props.descriptionById.isRunning ?
					<span onClick={this.stopInstance.bind(this)} style={{backgroundColor: "#6b0202"}} className="button"
								role="button">
						<span>STOP INSTANCE</span>
						<div className="icon">
							<img src={StopIcon}/>
						</div>
					</span>
					:
					<span onClick={this.showCloseModal.bind(this)} style={{backgroundColor: "#3d887a"}} className="button"
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
		return <li className="right-float">
			<div className="standard-nav-item">
				{this.props.descriptionById.isPublic ?
					<span onClick={this.changePublishStatus.bind(this)} className="button" role="button">
						<span>Make Private</span>
						<div className="icon">
							<img src={PrivateIcon}/>
						</div>
					</span>
					:
					<span onClick={this.changePublishStatus.bind(this)} className="button" role="button">
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
			isPublic: !this.props.descriptionById.isPublic
		};
		this.props.dispatch(updateDescription(this.props.descriptionById._id, reqParams)).then(() => {
			location.reload();
		})
	};

	getNavbar = () => {
		console.log(this.props);
		return <nav className="topbar">
			<ul>
				{this.props.descriptionById.createdBy === localStorage.getItem('user') ? this.getIsRunningNavBarStatus() : null}
				<li>
					<span className="no-action">
						{this.props.descriptionById.name} / {this.props.descriptionById.isRunning ? "Running" : "Stopped"}
						/ {this.props.descriptionById.isPublic ? "Published" : "Private"}
				</span>
				</li>
				{this.props.descriptionById.createdBy === localStorage.getItem('user') ? this.getIsPublishNavBarStatus() : null}
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

