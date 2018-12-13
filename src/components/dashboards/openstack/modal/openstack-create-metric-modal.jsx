import React from 'react'
import {connect} from 'react-redux';
import OpenStackMonitoringModal from './../../core/modal/openstack-new-dashlet-modal'
import Loader from './../../../core/loader/loader'
import {
	getOpenStackMonitoringConfig,
	addOpenStackDashLet
} from '../../../../actions/dashboard/openstack-monitoring-actions'
import {getOpenstackProjects, getOpenstackServers} from './../../../../actions/dashboard/openstack-actions'
import AddIcon from './../../../../../res/img/icons/add.png'
import AbstractAlertPopUp from './../../../core/popup/abstract-alert-popup'


@connect((store) => {
	return {
		config: store.openstackMonitoringConfig.config,
		fetched: store.openstackMonitoringConfig.fetched,
		projects: store.openstackProjectsReducer.projects,
		servers: store.openstackServers.servers
	}
})
export default class OpenStackCreateMetricPopUp extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			metric: '',
			delay: 0,
			delaytype: '',
			step: '',
			steptype: '',
			violated: false,
			server: '',
			show: '',
			servers: [],
			serversLoaded: false,
			loader: false,
			objectToSave: {},
			selectedServerId : '',
			selectedServerName : ''
		};

		this.handleChange = ::this.handleChange;
		this.handleSubmitNewOpenStackDashlet = ::this.handleSubmitNewOpenStackDashlet;

	}


	handleChange(event) {
		this.setState({[event.target.name]: event.target.value});
		if (event.target.name === "server") {
			let index = event.target.selectedIndex;
			let optionElement = event.target.childNodes[index];
			let serverId = optionElement.getAttribute('id');
			let serverName = optionElement.getAttribute('name');

			this.setState({
				selectedServerId: serverId ? serverId : "openstack",
				selectedServerName: serverName ? serverName : "openstack"
			});
		}
	}

	changeValidation() {
		this.setState({
			violated: !this.state.violated
		});
	}

	validate(res) {
		return new Promise((resolve, reject) => {
			for (let key of Object.keys(res)) {
				if (res[key] === 0 || res[key] === '') {
					this.changeValidation();
					reject('Error');
					return;
				}
			}
			resolve(res);
		})
	}

	commit() {
		return new Promise((resolve, reject) => {
			let objectToSave = {
				user: localStorage.getItem("user"),
				metric: this.state.metric,
				delay: this.state.delay,
				delaytype: this.state.delaytype,
				step: this.state.step + this.state.steptype,
				stepWithoutType: this.state.step,
				steptype: this.state.steptype,
				server: this.state.server,
				show: this.state.show,
				selectedServerId : this.state.selectedServerId,
				selectedServerName : this.state.selectedServerName
			};

			resolve(objectToSave);
		})
	}


	handleSubmitNewOpenStackDashlet() {
		this.commit()
			.then(res => this.validate(res))
			.then(res => {this.props.dispatch(addOpenStackDashLet(res)); 	location.reload()})
			.catch(err => console.log('There was an error:' + err));
	}


	getTimeCombobox(name) {
		return (<select onChange={this.handleChange} name={name} className="combobox half-width">
			<option disabled selected value> -- select an option --</option>
			<option>seconds</option>
			<option>minutes</option>
			<option>hours</option>
			<option>days</option>
			<option>weeks</option>
		</select>);
	}

	getTimeComboboxShort(name) {
		return (<select onChange={this.handleChange} name={name} className="combobox half-width">
			<option disabled selected value> -- select an option --</option>
			<option value='s'>seconds</option>
			<option value='m'>minutes</option>
			<option value='h'>hours</option>
			<option value='d'>days</option>
			<option value='w'>weeks</option>
		</select>);
	}

	getConfigCombobox() {
		return (<select name='metric' onClick={this.state.server ? this.getServerMetricConfig.bind(this) : null}
										onChange={this.handleChange} className="combobox full-width"
										disabled={!this.state.server}>
			<option disabled selected value> -- select an metric --</option>
			{this.state.server && this.props.fetched ? this.props.config.map(c => <option key={c}>{c}</option>) : null}
		</select>);
	}

	getServerMetricConfig() {
		this.props.dispatch(getOpenStackMonitoringConfig(this.state.server));
	}

	getServersCombobox() {
		return (<select name='server' onClick={!this.state.serversLoaded ? this.loadMoreServers.bind(this) : null}
										onChange={this.handleChange} className="combobox full-width">
			<option disabled selected value> -- select a server --</option>
			<option key="openstack" value={"openstack"}>Openstack Server</option>
			{this.state.servers.map(s => {
				let floatingIp = s.addresses.private.filter(adr => adr["OS-EXT-IPS:type"] === "floating").shift();
				return floatingIp ? <option key={s.id} id={s.id} name={s.name} value={floatingIp.addr}>Instance: {s.name}</option> : null;
			})}
		</select>);
	}

	loadMoreServers() {
		this.setState({
			loader: true
		});
		this.props.dispatch(getOpenstackProjects()).then(() => {
			this.props.projects.projects.map(prj => {
				this.props.dispatch(getOpenstackServers(prj.id)).then(() => {
					console.log(this.state.servers);
					console.log(this.props.servers.servers);
					this.setState({
						servers: this.props.servers.servers,
						serversLoaded: true,
						loader: false
					});
					console.log(this.state.servers);

				});
			});
		})
	}

	getShowCombobox() {
		return (<select name='show' onClick={!this.state.serversLoaded ? this.loadMoreServers.bind(this) : null}
										onChange={this.handleChange} className="combobox full-width">
			<option disabled selected value> -- select a server --</option>
			<option key="openstack" value="openstack">Openstack Dashboard</option>
			<option key="overview" value="overview">Overview Dashboard</option>
			{this.state.servers.map(s => {
				return <option key={s.id} value={s.id}>Dashboard of instance: {s.name}</option>;
			})}
		</select>);
	}

	getContent() {
		return (<form className="pure-form">
			<fieldset className="pure-group">
				<label>Metric</label>
				{this.state.servers ? this.getServersCombobox() : null}
				{this.state.servers ? this.getShowCombobox() : null}
				{this.getConfigCombobox()}
				<input name='delay' onChange={this.handleChange} type="number" className="pure-input-1-1 half-width"
							 placeholder="Delay"/>
				{this.getTimeCombobox('delaytype')}
				<input name="step" onChange={this.handleChange} type="number" className="pure-input-1-1 half-width"
							 placeholder="Step"/>
				{this.getTimeComboboxShort('steptype')}
			</fieldset>
			<a onClick={this.handleSubmitNewOpenStackDashlet} className="button" role="button">
				<span>Create</span>
				<div className="icon">
					<img src={AddIcon}/>
				</div>
			</a>
		</form>);
	}


	render() {
		return (<div>
			{this.state.violated ?
				<AbstractAlertPopUp type='warning' validation={this.changeValidation.bind(this)} title="Validation error"
														content="All fields are mandatory!"/> : null}
			<OpenStackMonitoringModal showCloseModal={this.props.showCloseModal}
																content={!this.state.loader ? this.getContent() : <Loader/>}
																title="Create new Dashlet"/>
		</div>)
	}
}


