import React from 'react';
import {connect} from 'react-redux';
import {getOpenstackTemplateById} from "../../../../actions/dashboard/openstack-actions"
import Loader from '../../../core/loader/loader'
import style from './style.scss'

@connect((store) => {
	return {
		vitrage: store.openstackVitrage
	}
})
export default class VitrageDetailsView extends React.Component {


	constructor(props) {
		super(props);
		this.props.dispatch(getOpenstackTemplateById(props.params.templateId));
	}


	normalizeText(text){
		return text.replace("_", " ").replace(".", " ");
	}



	getEntitiesList() {
		return this.props.vitrage.templatesDetails.definitions.entities.map(d => {
			return <ul key={d.entity.template_id}>
				<li>Category: {d.entity.category}</li>
				{d.entity.name ? <li>Name: {d.entity.name}</li> : null}
				<li>Template Id: {d.entity.template_id}</li>
			</ul>
		})
	}

	getEntities(title) {
		return <div>
			<h1>{title}</h1>
			{this.getEntitiesList()}
		</div>
	}

	getRelsList() {
		return this.props.vitrage.templatesDetails.definitions.relationships.map(d => {
			return <ul key={d.relationship.template_id}>
				<li>Source: {d.relationship.source}</li>
				<li>Relationship Type: {d.relationship.relationship_type}</li>
				<li>Target: {d.relationship.target}</li>
				<li>Template ID: {d.relationship.template_id}</li>
			</ul>
		})
	}

	getRels(title) {
		return <div>
			<h1>{title}</h1>
			{this.getRelsList()}
		</div>
	}

	getScenario() {
		return this.props.vitrage.templatesDetails.scenarios.map(sc => {
			return <div key={sc.scenario.condition} className="container-panel pure-u-1-3">
				<div className="container-nn">
				<h1>{sc.scenario.condition}</h1>
				{sc.scenario.actions.map(a => {
					return <ul key={a.action.action_type}>
						<li>Action Type: {a.action.action_type}</li>
						{/*<li>Action farewell: {a.action.properties.farewell}</li>*/}
						{/*<li>Action workflow: {a.action.properties.workflow}</li>*/}
					</ul>
				})}
				</div>
			</div>
		});
	}

	getContent() {
		return (<div>
				<div className="header-container-panel">
					{this.props.vitrage.templatesDetails.metadata.name ? <h1>{this.normalizeText(this.props.vitrage.templatesDetails.metadata.name)}</h1> : null }
					{this.props.vitrage.templatesDetails.metadata.description ?<span>{this.normalizeText(this.props.vitrage.templatesDetails.metadata.description)}</span> : null }
				</div>
				<div className="container-panel pure-u-1-2">
					<div className="container-nn">
					{this.getEntities("Template Entities")}
					</div>
				</div>
				<div className="container-panel pure-u-1-2">
					<div className="container-nn">
					{this.getRels("Template Relationships")}
					</div>
				</div>
				<div className="container-panel">
					<div className="container-nn">
					{this.getScenario()}
					</div>
				</div>
			</div>
		)
	}


	render() {
		return (
			<div>
				{console.log(this.props)}
				{this.props.vitrage.templatesDetails ? this.getContent() : <Loader/>}
			</div>
		)
	}

}
