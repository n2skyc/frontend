import React from 'react';
import {connect} from 'react-redux'
import {login} from '../../actions/administration/user-actions'
import LogoWhite from './../../../res/img/logo-white.svg'
import LogoBlack from './../../../res/img/logo.svg'
import {Link} from 'react-router'
import AbstractAlertPopUp from './../core/popup/abstract-alert-popup'
import {browserHistory} from 'react-router'
import style from './style.scss'


@connect((store) => {
	return {
		login: store.login
	}
})
export default class Auth extends React.Component {


	state = {
		// form: "profile",
		form: "profile--open",
		username: '',
		password: '',
		violated: false,
		violatedMessage: '',
		// logo: LogoWhite
		logo: LogoBlack
	};

	constructor(props) {
		super(props);
		if (localStorage.getItem('user')) {
			browserHistory.push('/overview');
		}
	}

	_handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			this.authonize();
		}
	};

	authonize() {
		if (!this.state.username || !this.state.password) {
			this.setState({violated: true, violatedMessage: "Login or password can't be empty"});
			return;
		}


		this.props.dispatch(login({
			name: this.state.username,
			password: this.state.password
		})).then(() => {
			if (this.props.login.resp.success) {
				localStorage.setItem('user', this.state.username);
				localStorage.setItem('token', this.props.login.resp.token);
				localStorage.setItem('type', this.props.login.resp.user.type);
				this.redirectUser()
			} else {
				this.setState({
					violated: true,
					violatedMessage: this.props.login.resp.message
				})
			}
		});
	}


	redirectUser = () => {
		if(this.props.login.resp.user.type === 'admin'){
			browserHistory.push('/overview');
		} else {
			browserHistory.push('/n2sky');
		}
	};


	openForm() {
		this.setState({
			form: "profile--open",
			logo: LogoBlack
		});
	}

	changeValidation() {
		this.setState({
			violated: !this.state.violated
		});
	}

	signUp = () => {
		browserHistory.push('/signup');
	};

	render() {
		return (
			<div>
				{this.state.violated ?
					<AbstractAlertPopUp type='warning' validation={this.changeValidation.bind(this)}
															title={this.state.violatedMessage}/> : null}
				<div className="container">
					<div className={this.state.form}>
						<button className="profile__avatar" id="toggleProfile">
							<div onClick={this.openForm.bind(this)} className="header-auth">
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
									<input onKeyPress={this._handleKeyPress} value={this.state.username} onChange={(evt) => {
										this.setState({username: evt.target.value})
									}} type="text" id="fieldUser" className="input" required/>
									<label htmlFor="fieldUser" className="label">Username</label>
								</div>
								<div className="field">
									<input onKeyPress={this._handleKeyPress} value={this.state.password} onChange={(evt) => {
										this.setState({password: evt.target.value})
									}} type="password" id="fieldPassword" className="input" required/>
									<label htmlFor="fieldPassword" className="label">Password</label>
								</div>
								<div className="profile__footer">
									<button onClick={this.authonize.bind(this)} className="btn">Login</button>
									<button onClick={this.signUp} className="btn">Sign up</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

