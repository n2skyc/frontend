import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router'
import Enter from './../../../../../res/img/icons/right-arrow.png'
import style from './style.scss'

@connect((store) => {
	return {
		browser: store.browser
	}
})
export default class ProjectsDashlet extends React.Component {

	state = {};

	constructor(props) {
		super(props);
	}

	render() {
		let style = "pure-u-1-3";
		if(this.props.browser.is.small || this.props.browser.is.extraSmall) {
			style = "pure-u-1-1";
		} else if (this.props.browser.is.medium || this.props.browser.large) {
			style = "pure-u-1-2";
		} else {
			style = "pure-u-1-3";
		}
		return (
			<div className={`${style} container-panel`}>
				<div className="container-nn">
					<div className="container-header-panel">
						<h1>Project {this.props.project.name}</h1>
					</div>
					<ul>
						<li>ID: {this.props.project.id}</li>
						{/*{this.props.project.description ? <li>Description: {this.props.project.description}</li> : null}*/}
						<li>Enabled: {this.props.project.enabled ? "Yes" : "No"}</li>
						<li>Is a domain: {this.props.project.is_domain ? "Yes " + this.props.project.domain_id : "No"} </li>
						<li>Parent: {this.props.project.parent_id}</li>
					</ul>
					<Link to={"openstack/project/" + this.props.project.id}>
						<a className="button" role="button">
							<span>Open Project</span>
							<div className="icon">
								<img src={Enter}/>
							</div>
						</a>
					</Link>
				</div>
			</div>
		)
	}
}
