import React from 'react'
import {connect} from 'react-redux'
import {getOpenstackFlavor} from "../../../actions/dashboard/openstack-actions"
import Loader from './../../core/loader/loader'
import FlavorDashlet from './dashlets/flavors-dashlet'


@connect((store) => {
	return {
		flavor: store.flavor.flavor,
		fetched: store.flavor.fetched,
		browser: store.browser
	}
})
export default class FlavorDashboard extends React.Component {

	constructor(props) {
		super(props);
		this.props.dispatch(getOpenstackFlavor(this.props.id));
	}

	addDashlets(flavors) {
		return flavors.flavors.map(flv => <FlavorDashlet key={flv.id} flavor={flv}/>);
	}


	render() {
		let style = "pure-u-1-2";
		if(this.props.browser.is.small || this.props.browser.is.extraSmall) {
			style = "pure-u-1-1";
		} else if (this.props.browser.is.medium || this.props.browser.large) {
			style = "pure-u-1-1";
		} else {
			style = "pure-u-1-2";
		}
		return (
			<div className={`list-dashlet ${style}`}>
				<div className="atb-text-wrap">
					<div className="atb-text">
						<h1 className="new-single-title">Flavors</h1>
					</div>
				</div>
				{this.props.fetched ? this.addDashlets(this.props.flavor) : <Loader/>}
			</div>
		)
	}
}
