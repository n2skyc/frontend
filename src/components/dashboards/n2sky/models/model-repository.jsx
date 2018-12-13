import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router'
import ModeDetails from './components/model-details'
import ModelsTable from './components/models-table'
import EmptyModelDetails from './components/empty-model-details'
import DetailsModelsTable from './../components/details-subcomponents/details-models-tabel'

@connect((store) => {
	return {
		browser: store.browser
	}
})
export default class ModelsRepository extends React.Component {


	state = {
		model: null
	};

	constructor(props) {
		super(props);

	}

	getNavbar = () => {
		return <nav className="topbar">
			<ul>
				<li><span className="no-action">Models Repository</span></li>
			</ul>
		</nav>
	};

	setModel = (model) => {
		this.setState({model: model})
	};


	render() {
		let style = "pure-u-1-2";
		if(this.props.browser.is.small || this.props.browser.is.extraSmall) {
			style = "pure-u-1-1";
		} else if (this.props.browser.is.medium || this.props.browser.large) {
			style = "pure-u-1-1";
		}
		return (
			<div>
				{this.getNavbar()}
				<div className="pure-g">
					<div className={style}>
						{/*<ModelsTable setModel={this.setModel}/>*/}
					<DetailsModelsTable setModel={this.setModel}/>
					</div>
					<div className={style}>
						{this.state.model ? <ModeDetails model={this.state.model}/> : <EmptyModelDetails/>}
					</div>
					{/*{this.props.done ? this.getDescription() : <Loader/>}*/}
				</div>
				{/*{this.props.done && this.props.descriptions.length === 0 ? this.getNoOwnNN() : null}*/}
				{/*<NavigationPage chainButtonVisible={false} method={this.geDescriptonWithOffset} offsetSize={offsetSize}/>*/}
			</div>
		)
	}
}

