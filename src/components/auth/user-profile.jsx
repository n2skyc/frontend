import React from 'react';
import {connect} from 'react-redux'
import style from './style.scss'
import {browserHistory} from 'react-router'
import {getUserByIdentity} from './../../actions/administration/user-actions'
import UserIcon from './../../../res/img/icons/seo.svg'

@connect((store) => {
	return {
		user: store.getUserByIdentity.user,
	}
})
export default class UserProfile extends React.Component {


	state = {};

	constructor(props) {
		super(props);
		this.props.dispatch(getUserByIdentity(localStorage.getItem("user")));
	}

	getName = () => {
		let fn = localStorage.getItem("firstName");
		let ln = localStorage.getItem("lastName");
		if (fn || ln) {
			return fn + " " + ln;
		}
		return localStorage.getItem("user");
	};

	logout() {
		localStorage.removeItem("user");
		browserHistory.push('/');
	}



	render() {
		return (
			<div className="profile-container">
				<img src={UserIcon} className="profile-img" />
				<div className="profile-text">
					<h1 className="profile-name">{this.getName()}</h1>
					<span onClick={this.logout.bind(this)} className="profile-title">Logout</span>
				</div>
			</div>
		)
	}
}

