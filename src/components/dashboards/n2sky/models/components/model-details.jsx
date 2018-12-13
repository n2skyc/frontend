import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router'
import Loader from './../../../../core/loader/loader'
import DownloadIcon from './../../../../../../res/img/icons/download.svg'
import TestIcon from './../../../../../../res/img/icons/flask_white.svg'

@connect((store) => {
	return {}
})
export default class ModeDetails extends React.Component {


	constructor(props) {
		super(props);
	}

	getRawModel = () => {
		return <div className="container-panel pure-u-1-1">
			<div className="container-nn">
				<div className="container-header-panel">
					<h1>RAW MODEL in JSON Format</h1>
				</div>
				<pre className="raw-model">
					{this.props.model.rawModel}
				</pre>
				{console.log(this.props)}
				<a onClick={this.download.bind(this)} className="button" role="button">
					<span>Download JSON file</span>
					<div className="icon">
						<img src={DownloadIcon}/>
					</div>
				</a>
			</div>
		</div>
	};

	getContent = () => {
		return <div>

			<div className="pure-g">
				{this.props.model ? this.getParamDetails() : <Loader/>}
				{/*{this.getTabs()}*/}
				{this.props.model ? this.getRawModel() : <Loader/>}
			</div>
		</div>
	};

	getTabs = () => {
		return <nav className="topbar pure-u-1-1">
			<ul>
				<li><span className="tab">Raw Model</span></li>
				<li><span className="tab">VINSL Formated Model</span></li>
			</ul>
		</nav>
	};

	getParamDetails = () => {
		return <div className="container-panel pure-u-1-1">
			<div className="container-nn">
				<div className="container-header-panel">
					<h1>Model ID: {this.props.model._id}</h1>
					<div className="button-in-header">
						<Link to={"/n2sky/network/" + this.props.model.vinnslDescriptionId + "/test/" + this.props.model._id}
									className="icon-button-container button" role="button">
							<span>Details and Tests</span>
							<div className="icon">
								<img src={TestIcon}/>
							</div>
						</Link>
					</div>
				</div>
				{this.getRequestedParameters(this.props.model.parameters.input)}
			</div>
		</div>
	};

	getRequestedParameters(modelParameters) {
		let lies = [];
		modelParameters.map(p => {
			lies.push(<li key={p.parameter}><span>{p.parameter}:</span> {p.value} </li>)

		});
		return <ul>{lies}</ul>;
	}


	download() {
		let element = document.createElement('a');
		element.setAttribute('href', 'data:Application/octet-stream,' + encodeURIComponent(this.props.model.rawModel));
		element.setAttribute('download', this.props.model._id + ".json");

		element.style.display = 'none';
		document.body.appendChild(element);

		element.click();

		document.body.removeChild(element);
	}

	render() {
		console.log(this.props.model);
		return (
			<div>
				{this.getContent()}
			</div>
		)
	}
}

