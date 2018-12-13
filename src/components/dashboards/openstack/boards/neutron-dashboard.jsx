import React from 'react';
import {connect} from 'react-redux';
import {getOpenstackNutronByType} from "../../../../actions/dashboard/openstack-actions"
import Loader from '../../../core/loader/loader'
import style from './style.scss'

@connect((store) => {
	return {
		neutron: store.openstackNeutron,
		browser: store.browser
	}
})
export default class NeutronDashboard extends React.Component {

	constructor(props) {
		super(props);

		this.props.dispatch(getOpenstackNutronByType('networks'));
		this.props.dispatch(getOpenstackNutronByType('extensions'));
		this.props.dispatch(getOpenstackNutronByType('subnetpools'));
		this.props.dispatch(getOpenstackNutronByType('service-providers'));

	}

	getNetworksList() {
		return this.props.neutron.networks.networks.map(n => {
			return <ul key={n.id}>
				<li>Name: {n.name}</li>
				<li>ID: {n.id}</li>
				<li>Status: {n.status}</li>
				<li>Created: {n.created_at}</li>
				<li>MTU: {n.mtu}</li>
				<li>Shared: {n.shared ? 'YES' : 'NO'}</li>
				<li>External Router: {n['router:external'] ? 'YES' : 'NO'}</li>
			</ul>
		})
	}

	getNetworks(title){
		return <div>
			<h1>{title}</h1>
			{this.getNetworksList()}
		</div>
	}

	getServiceProvidersList() {
		return this.props.neutron.service_providers.service_providers.map(s => {
			return <ul key={s.name}>
				<li>Name: {s.name}</li>
				<li>Service Type: {s.service_type}</li>
				<li>Default Provider: {s.default ? 'YES' : 'NO'}</li>
			</ul>
		})
	}

	getServiceProviders(title){
		return <div>
			<h1>{title}</h1>
			{this.getServiceProvidersList()}
		</div>
	}

	getServiceSubnetpoolsList() {
		return this.props.neutron.subnetpools.subnetpools.map(s => {
			return <ul key={s.id}>
				<li>Name: {s.name}</li>
				<li>ID: {s.id}</li>
				<li>Created at: {s.created_at}</li>
				<li>Default prefixlen: {s.default_prefixlen}</li>
				<li>Max prefixlen: {s.max_prefixlen}</li>
				<li>Min prefixlen: {s.min_prefixlen}</li>
				<li>Prefixes {s.prefixes.join(', ')}</li>
			</ul>
		})
	}

	getSubnetPools(title){
		return <div>
			<h1>{title}</h1>
			{this.getServiceSubnetpoolsList()}
		</div>
	}
	render() {
		let style = "pure-u-1-3";
		if(this.props.browser.is.small || this.props.browser.is.extraSmall) {
			style = "pure-u-1-1";
		} else if (this.props.browser.is.medium || this.props.browser.large) {
			style = "pure-u-1-2";
		} else {
			style = "pure-u-1-3";
		}
		return (
			<div>
				<div className={`container-panel ${style}`}>
					<div className="container-nn">
					{this.props.neutron.networks.networks ? this.getNetworks("Openstack Networks") : <Loader/>}
					</div>
				</div>
				<div className={`container-panel ${style}`}>
					<div className="container-nn">
					{this.props.neutron.subnetpools.subnetpools ? this.getSubnetPools("Openstack Subnet Pools") : <Loader/>}
					</div>
				</div>
				<div className={`container-panel ${style}`}>
					<div className="container-nn">
					{this.props.neutron.service_providers.service_providers ? this.getServiceProviders("Openstack Service Providers") : <Loader/>}
					</div>
				</div>
			</div>
		)
	}

}
