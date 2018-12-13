import React from 'react'
import style from './style.scss'

export default class SettingsMenu extends React.Component {
	constructor(props) {
		super(props);


	}


	render() {
		return (
			<div>
				<div className="container-settings-menu">
					<div className="clickhere">Click here <i className="fa fa-arrow-right"/></div>
					<div className="menubtn"><span/></div>
					<nav className="navmenu">
						<h4>Menu</h4>
						<ul className="text-list">
							<li><a href="#">Home</a></li>
							<li><a href="#">Gallery</a></li>
							<li><a href="#">Contact</a></li>
						</ul>
						<ul className="thumbs-list">
							<li><a href="#"><i className="fa fa-cab"/></a></li>
							<li><a href="#"><i className="fa fa-beer"/></a></li>
							<li><a href="#"><i className="fa fa-anchor"/></a></li>
							<li><a href="#"><i className="fa fa-bus"/></a></li>
							<li><a href="#"><i className="fa fa-ship"/></a></li>
							<li><a href="#"><i className="fa fa-street-view"/></a></li>
						</ul>
					</nav>
				</div>
			</div>
		)
	}
}
