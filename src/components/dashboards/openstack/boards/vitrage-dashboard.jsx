import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router'
import {
	getOpenstackTemplates,
	getOpenstackRecources
} from "../../../../actions/dashboard/openstack-actions"
import Loader from '../../../core/loader/loader'
import DetailsIcon from '../../../../../res/img/icons/right-arrow.png'
import style from './style.scss'

@connect((store) => {
	return {
		vitrage: store.openstackVitrage,
		browser: store.browser
	}
})
export default class VitrageDashboard extends React.Component {


	constructor(props) {
		super(props);

		this.props.dispatch(getOpenstackTemplates());
		this.props.dispatch(getOpenstackRecources());
	}


	getTemplatesList() {
		return this.props.vitrage.templates.map(t => {
			return <div>
				<ul key={t.uuid}>
					<li>Name: {t.name}</li>
					<li>ID: {t.uuid}</li>
					<li>Status Details: {t['status details']}</li>
					<li>Status: {t.status}</li>
					<li>Date: {t.date}</li>
				</ul>
				<Link to={"/openstack/vitrage/" + t.uuid} className="button" role="button">
					<span>Template Details</span>
					<div className="icon">
						<img src={DetailsIcon}/>
					</div>
				</Link>
			</div>
		})
	}

	getTemplates(title) {
		return <div>
			<h1>{title}</h1>
			{this.getTemplatesList()}
		</div>
	}

	getRecourcesList() {
		return this.props.vitrage.recources.map(t => {
			return <ul key={t.id}>
				<li>Name: {t.name}</li>
				<li>ID: {t.id}</li>
				<li>State: {t.state}</li>
				<li>Vitrage aggregated state: {t.vitrage_aggregated_state}</li>
				<li>Vitrage Category: {t.vitrage_category}</li>
				<li>Vitrage id: {t.vitrage_id}</li>
				<li>Vitrage Operational State: {t.vitrage_operational_state}</li>
				<li>Vitrage Type: {t.vitrage_type}</li>
			</ul>
		})
	}

	getRecources(title) {
		return <div>
			<h1>{title}</h1>
			{this.getRecourcesList()}
		</div>
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
			<div>
				{console.log(this.props)}
				<div className={`container-panel ${style}`}>
					<div className="container-nn">
						{this.props.vitrage.templates ? this.getTemplates("Openstack Templates") : <Loader/>}
					</div>
				</div>
				<div className={`container-panel ${style}`}>
					<div className="container-nn">
						{this.props.vitrage.recources ? this.getRecources("Openstack Resources") : <Loader/>}
					</div>
				</div>
			</div>
		)
	}

}
