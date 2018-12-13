import React from 'react';

export default class Main extends React.Component {

	constructor(props){
		super(props);
		window.scrollTo(0, 0);
		document.title = "Young Folks - Модели и фотографы со всего мира";
	}

	render() {
		return (
			<div className="child-container">
			HOME
			</div>
		)
	}
}

