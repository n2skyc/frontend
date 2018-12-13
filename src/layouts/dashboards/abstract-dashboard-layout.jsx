import React from 'react'
import Sidebar from './../core/sidebar'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import NewDescriptionPopup from './../../components/dashboards/n2sky/components/new-description-popup'
import SettingsPopUp from './../core/popup/settings-popup'
import MobileMenu from './../core/menu/mobile-menu'
import resizeWindow from './../../reducers/administration/window-reducer'
import style from './style.scss'
import store from './../../store'

@connect((store) => {
	return {
		window: store.window
	}
})
export default class AbstractDashboardLayout extends React.Component {
	constructor(props) {
		super(props);
		// if (!localStorage.getItem("user")) {
		// 	browserHistory.push('/');
		// }
		this.state = {
			showModal: false,
			showNNModal: false,
			width: window.innerWidth,
			mobileViewSize: 850,
			isMobile: false,
			inlineStyle: {}
		};

		this.updateDimensions = ::this.updateDimensions;

	}

	componentDidMount() {
		this.updateDimensions();
		window.addEventListener("resize", this.updateDimensions);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.updateDimensions);
	}

	updateDimensions() {
		let isMobile = window.innerWidth < this.state.mobileViewSize;
		console.log(isMobile)
		// store.dispatch(resizeWindow());
		this.setState({
			width: window.innerWidth,
			inlineStyle: isMobile ? {padding: 0} : {},
			isMobile: isMobile
		})
	}

	showCloseModal() {
		this.setState({
			showModal: !this.state.showModal
		})
	}

	showCloseNewNNModal() {
		this.setState({
			showNNModal: !this.state.showNNModal
		})
	}

	render() {
		return (
			<div>
				{this.state.isMobile ? <MobileMenu showCloseNewNNModal={this.showCloseNewNNModal.bind(this)}
																					 showCloseModal={this.showCloseModal.bind(this)}/>
					:
					<Sidebar showCloseNewNNModal={this.showCloseNewNNModal.bind(this)}
									 showCloseModal={this.showCloseModal.bind(this)}/>

				}
				<div style={this.state.inlineStyle} className="wrap-all-the-things">
					{React.cloneElement(this.props.children, {
						width: this.state.width,
						mobileViewSize: this.state.mobileViewSize,
						isMobile: this.state.isMobile
					})}
				</div>
				{this.state.showModal ? <SettingsPopUp showCloseModal={this.showCloseModal.bind(this)}/> : null}
				{this.state.showNNModal ? <NewDescriptionPopup showCloseModal={this.showCloseNewNNModal.bind(this)}/> : null}
			</div>
		)
	}
}
