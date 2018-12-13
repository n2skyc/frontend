import React from 'react'
import style from './style.scss'

export default class Loader extends React.Component {
	render() {
		return (
			<div className="loader-container">
				<span className="dots"/>
				<span className="dots"/>
				<span className="dots"/>
				<span className="dots"/>
				<span className="dots"/>
				<span className="dots"/>
				<span className="dots"/>
				<span className="dots"/>
				<span className="dots"/>
				<span className="dots"/>
			</div>
		);
	}
};
