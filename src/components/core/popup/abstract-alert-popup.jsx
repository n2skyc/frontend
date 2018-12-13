import React from 'react'
import style from './style.scss'

export default class AbstractAlertPopUp extends React.Component {

	constructor(props){
		super(props);

	}

	getButtonColor(){
		switch(this.props.type) {
			case 'warning':
				return {backgroundColor: '#f9a742'};
				break;
			case 'error':
				return {backgroundColor: '#e06767'};
				break;
			default:
				return null;
		}
	}

	escFunction(event){
		if(event.keyCode === 27) {
			console.log(this.state);
		}
	}
	componentDidMount(){
		document.addEventListener("keydown", this.escFunction, false);
	}
	componentWillUnmount(){
		document.removeEventListener("keydown", this.escFunction, false);
	}

	render() {
		return (
			<div onKeyPress={this.props.validation} onClick={this.props.validation} className="alert-popup">
				<span className='button-popup'>{this.props.title}</span>
			</div>
		);
	}
};
