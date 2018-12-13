import React from 'react'
import {connect} from 'react-redux'
import Rickshaw from 'rickshaw'
import {getMonitoringData} from '../../../../actions/dashboard/openstack-monitoring-actions'
import style from 'rickshaw/rickshaw.css'
import MonitoringDashletHeader from './components/monitoring-dashlet-header'

@connect((store) => {
	return {
		monitoring: store.monitoring,
		browser: store.browser
	}
})
export default class MonitoringDashlet extends React.Component {

	state = {
		metric: null,
		series: []
	};

	graph = null;

	palette = new Rickshaw.Color.Palette();


	constructor(props) {
		super(props);
	}


	setGraphData() {
		let seriesToAdd = [];

		this.state.metric.map(dataset => {
			let data = [];
			dataset.values.map(v => {
				data.push({x: parseInt(v[0]), y: parseFloat(v[1])});
			});
			let serie = {
				color: this.palette.color(),
				data: data,
				labels: dataset.metric
			};
			seriesToAdd.push(serie);
		});
		this.setState({
			series: seriesToAdd
		});
	}

	componentDidMount() {

		this.props.dispatch(getMonitoringData(this.props.conf)).then(() => {
			this.setState({
				metric: this.props.monitoring[this.props.conf.metric]
			});
			this.setGraphData();
		});


		this.graph = new Rickshaw.Graph({
			element: document.querySelector('#' + this.props.conf.metric),
			renderer: "line",
			interpolation: "linear",
			series: this.state.series,
			min: "auto",
		});

		this.graph.render();

		let hoverDetail = new Rickshaw.Graph.HoverDetail({
			graph: this.graph,
			formatter: function (series, x, y) {
				let date = '<span class="date">' + new Date(x * 1000).toUTCString() + '</span>';
				let swatch = '<span class="detail_swatch" style="background-color: ' + series.color + '"></span>';
				let content = swatch + (series.labels.__name__ || 'value') + ": <strong>" + y + '</strong>';
				return date + '<br>' + content + '<br>' + renderLabels(series.labels);
			}
		});

		// grid
		let xAxis = new Rickshaw.Graph.Axis.Time({graph: this.graph});

		let yAxis = new Rickshaw.Graph.Axis.Y({
			graph: this.graph,
			tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
			element: document.getElementById('y_axis')
		});


		yAxis.render();
		xAxis.render();

		let renderLabels = function (labels) {
			let labelStrings = [];
			for (let label in labels) {
				if (label != "__name__") {
					labelStrings.push("<strong>" + label + "</strong>: " + escapeHTML(labels[label]));
				}
			}
			return labels = "<div class=\"labels\">" + labelStrings.join("<br>") + "</div>";
		};

		let escapeHTML = function (string) {
			let entityMap = {
				"&": "&amp;",
				"<": "&lt;",
				">": "&gt;",
				'"': '&quot;',
				"'": '&#39;',
				"/": '&#x2F;'
			};
			return String(string).replace(/[&<>"'\/]/g, function (s) {
				return entityMap[s];
			});
		};

		// setInterval(() => this.triggerMonitoring(), 5000);

	}

	triggerMonitoring(){
		this.props.dispatch(getMonitoringData(this.props.conf)).then(() => {
			this.setState({
				metricName: this.props.conf.metric,
				metric: this.props.monitoring[this.props.conf.metric]
			});
			this.setGraphData();
		});
	}


	getChart() {
		this.graph.series.map(s => this.graph.series.pop(s));
		this.state.series.map(s => this.graph.series.push(s));
		this.graph.validateSeries(this.graph.series);
		this.graph.update();
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
			<div className={style}>
				{this.state.metric ? <MonitoringDashletHeader conf={this.props.conf} name={this.state.metric[0].metric.__name__}/> : null}
				<div className="dashlet-container">
					{this.state.series.length > 0 && this.graph ? this.getChart() : null}
					<div ref="graph" id={this.props.conf.metric}/>
				</div>
			</div>
		);
	}
}
