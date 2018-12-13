import React from 'react';
import {connect} from 'react-redux'
import {registration} from '../../actions/administration/user-actions'
import LogoBlack from './../../../res/img/logo.svg'
import {Link} from 'react-router'
import AbstractAlertPopUp from './../core/popup/abstract-alert-popup'
import {browserHistory} from 'react-router'
import style from './style.scss'


@connect((store) => {
	return {
		reg: store.reg
	}
})
export default class Reg extends React.Component {


	state = {
		form: "profile--open",
		logo: LogoBlack,
		username: '',
		password: '',
		password_repeat: '',
		email: '',
		violated: false,
		violatedMessage: ''
	};

	constructor(props) {
		super(props);
		if (localStorage.getItem('user')) {
			browserHistory.push('/n2sky');
		}
	}

	_handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			this.register();
		}
	};

	register = () => {

		if(!this.validate()){
			return;
		} else {
			this.props.dispatch(registration(this.generateUser())).then(() => {
				if(!this.props.reg.resp.success){
					this.setState({violated: true, violatedMessage: this.props.reg.resp.message });
				} else {
					localStorage.setItem('user', this.props.reg.resp.user.name);
					localStorage.setItem('token', this.props.reg.resp.token);
					localStorage.setItem('type', this.props.reg.resp.user.type);
					browserHistory.push('/n2sky');
				}
			})
		}

	};

	generateUser = () => {
		let user = {
			name: this.state.username,
			password: this.state.password,
			email: this.state.email
		};
		return user;
	};

	validate = () => {
		if (!this.state.username || !this.state.password || !this.state.password_repeat || !this.state.email) {
			this.setState({violated: true, violatedMessage: "All fields are mandatory"});
			return false;
		}

		if (this.state.password !== this.state.password_repeat) {
			this.setState({violated: true, violatedMessage: "Passwords are doesn't match"});
			return false;
		}

		if (this.state.password.length < 6) {
			this.setState({violated: true, violatedMessage: "Password must hve at least 6 characters"});
			return false;
		}

		if(this.validateEmail()){
			this.setState({violated: true, violatedMessage: "Email is not valid"});
			return false;
		}

		return true;
	};

	validateEmail = () => {
		let re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
		return !re.test(this.state.email);
	};


	changeValidation() {
		this.setState({
			violated: !this.state.violated
		});
	}

	render() {
		return (
			<div>
				{this.state.violated ?
					<AbstractAlertPopUp type='warning' validation={this.changeValidation.bind(this)}
															title={this.state.violatedMessage}/> : null}
				<div className="container">
					<div className={this.state.form}>
						<button className="profile__avatar" id="toggleProfile">
							<div className="header-auth">
								<img id="spin" src={this.state.logo}/>
								<div className="wrapper-header">
									<div className="letters">
										<span className="letter">n</span>
										<span className="letter">2</span>
										<span className="letter">s</span>
										<span className="letter">k</span>
										<span className="letter">y</span>
									</div>
								</div>
							</div>
						</button>
						<div className="profile__form">
							<div className="profile__fields">
								<div className="field">
									<input onKeyPress={this._handleKeyPress}  value={this.state.username} onChange={(evt) => {
										this.setState({username: evt.target.value})
									}} type="text" id="fieldUser" className="input" required/>
									<label htmlFor="fieldUser" className="label">Username</label>
								</div>
								<div className="field">
									<input onKeyPress={this._handleKeyPress}  value={this.state.email} onChange={(evt) => {
										this.setState({email: evt.target.value})
									}} type="text" id="fieldEmail" className="input" required/>
									<label htmlFor="fieldEmail" className="label">Email</label>
								</div>
								<div className="field">
									<input onKeyPress={this._handleKeyPress}  value={this.state.password} onChange={(evt) => {
										this.setState({password: evt.target.value})
									}} type="password" id="fieldPassword" className="input" required/>
									<label htmlFor="fieldPassword" className="label">Password</label>
								</div>
								<div className="field">
									<input onKeyPress={this._handleKeyPress}  value={this.state.password_repeat} onChange={(evt) => {
										this.setState({password_repeat: evt.target.value})
									}} type="password" id="fieldPasswordRepeat" className="input" required/>
									<label htmlFor="fieldPasswordRepeat" className="label">Repeat the password</label>
								</div>
								<div className="profile__footer">
									<button onClick={this.register} className="btn">Sign Up</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

