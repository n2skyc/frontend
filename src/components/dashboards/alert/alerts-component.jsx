import React from 'react';
import {connect} from 'react-redux'
import {getAlerts} from './../../../actions/alert/alerts-actions'
import Loader from './../../core/loader/loader'
import AddIcon from './../../../../res/img/icons/add.png'
import CreateAlertPopup from './create-alert-popup'

@connect((store) => {
	return {
		alerts: store.getAlerts.alerts,
		browser: store.browser
	}
})
export default class AlertsComponent extends React.Component {

	state = {
		showCreateAlertPopup: false
	};

	constructor(props) {
		super(props);
		this.props.dispatch(getAlerts());
	}

	showCloseCreatePopup() {
		this.setState({
			showCreateAlertPopup: !this.state.showCreateAlertPopup
		})
	}

	getLabel = () => {
		return <nav className="topbar">
			<ul>
				<li><span className="no-action">Fired Alerts</span></li>
				<li className="right-float">
					<div className="standard-nav-item">
					<span onClick={this.showCloseCreatePopup.bind(this)} className="button" role="button">
						<span>Create Alert</span>
						<div className="icon">
							<img src={AddIcon}/>
						</div>
					</span>
					</div>
				</li>
			</ul>
		</nav>
	};

	getAlerts = () => {
		let style = "pure-u-1-3";
		if (this.props.browser.is.small || this.props.browser.is.extraSmall) {
			style = "pure-u-1-1";
		} else if (this.props.browser.is.medium || this.props.browser.large) {
			style = "pure-u-1-2";
		}
		return <div className="pure-g">
			{this.props.alerts.map(a => {
				return <div key={a.fingerprint} className={`container-panel ${style}`}>
					<div className="container-nn"><h1>{a.labels.alertname}</h1>
						<ul className="draw-border" style={{backgroundColor: this.getAlertyType(a.labels.severity)}}>
							<li><span>Summary:</span> {a.annotations.summary}</li>
							<li><span>Description:</span> {a.annotations.description}</li>
							<li><span>Starts at:</span> {a.startsAt}</li>
							<li><span>Ends at:</span> {a.endsAt}</li>
							<li><span>Status:</span> {a.status.state}</li>
							{a.receivers.map(r => <li key={r}><span>Receiver:</span> {r}</li>)}
							<li><span>Location:</span> {a.generatorURL}</li>
						</ul>
					</div>
				</div>

			})}
		</div>
	};

	getAlertyType = (type) => {
		if (type === 'warning') {
			return "rgb(255, 239, 209)";
		} else if (type === 'critical') {
			return "#ffe1e1"
		} else {
			return "#ffffff";
		}
	};

	render() {
		return (
			<div>
				{this.getLabel()}
				{this.props.alerts ? this.getAlerts() : <Loader/>}
				{this.state.showCreateAlertPopup ?
					<CreateAlertPopup showCloseModal={this.showCloseCreatePopup.bind(this)}/> : null}
			</div>
		)
	}
}

