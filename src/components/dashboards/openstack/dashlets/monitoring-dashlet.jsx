import React from 'react'
import {connect} from 'react-redux'
import style from './style.scss'
import {Line} from 'react-chartjs'
import {getMonitoringData} from '../../../../actions/dashboard/openstack-monitoring-actions'
import { TimeSeries, TimeRange } from "pondjs";
import { Charts, ChartContainer, ChartRow, YAxis, LineChart } from "react-timeseries-charts";



@connect((store) => {
	return {
		monitoring: store.monitoring
	}
})
export default class MonitoringDashlet extends React.Component {

	state = {
		metricName: '',
		columns: ["time", "value"],
		points: '',
		tracker: null,
		metric: {},
		data: null,
		series: null
	};

	constructor(props) {
		super(props);

		this.props.dispatch(getMonitoringData(this.props.conf)).then(() => {
			this.setState({
				metricName: this.props.conf.metric,
				metric: this.props.monitoring[this.props.conf.metric]
			});
			this.setGraphData();
		});
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

	componentDidMount() {

		// setInterval(() => this.triggerMonitoring(), 7000);
	}


	setGraphData() {

		let datatest = {};

		datatest.name = this.state.metricName;
		datatest.columns = this.state.columns;


		this.state.metric.map(dataset => {
			datatest.points = dataset.values;
			this.setState({
				points: dataset.values
			})
		});


		let serie = new TimeSeries(datatest);
		this.setState({
			series : serie
		})

		console.log(this.state);




        //
		// let datasets = this.getDataSets();
		// let labels = this.getLabels();
        //
		// this.setState({
		// 	data: {
		// 		labels: labels,
		// 		datasets: datasets
		// 	}
		// });
	}

	getLabels() {
		let labels = [];
		this.state.metric.shift().values.map(t => labels.push(t[0]))
		return labels;
	}

	getDataSets() {
		let datasets = [];

		this.state.metric.map(dataset => {

			delete dataset.metric['__name__'];
			delete dataset.metric['instance'];
			delete dataset.metric['job'];

			// TODO Label
			let label = JSON.stringify(dataset.metric);
			let data = [];
			dataset.values.map(v => data.push(v[1]));
			datasets.push({
				label,
				data,
				backgroundColor: [
					'rgba(255,99,132)'
				]
			})
		});
		return datasets;
	}

	getYAxisFirst(){
		return (<YAxis
			id={this.state.metric[0].__name__}
			label="Price ($)"
			type="linear"
			min={this.state.series.min()} max={this.state.series.max()}
			width="60"/>);
	}

	getYAxis(){
		// if(this.state.metric<=1) return;
		return this.state.metric.slice(1).forEach(v => {
			return (<YAxis
				id={v.metric.__name__}
				label="Price ($)"
				type="linear"
				min={this.state.series.min()} max={this.state.series.max()}
				width="60"/>)
		});
	}


	getLineCharts() {
		return this.state.metric.map(v => {
			let ds = {};
			ds.name = v.metric.__name__;
			ds.columns = this.state.columns;
			ds.points = v.values;
			return (<LineChart axis={v.metric.__name__} series={new TimeSeries(ds)}/>)
		});
	}


	render() {
		return (<div>{this.state.series ?
			<ChartContainer utc={true}
											showGrid={true}
											showGridPosition="under"
											timeRange={this.state.series.timerange()}
											trackerPosition={this.state.tracker}
											trackerTimeFormat="%X"
											onTrackerChanged={tracker => this.setState({tracker})}>
				<ChartRow height="200">
					{this.getYAxis()}
					<Charts>
						{this.getLineCharts()}
					</Charts>
				</ChartRow>
			</ChartContainer> : null}</div>);

		// return (<div/>);
		// return (<div>{this.state.data ? <Line data={this.state.data} width="600" height="250"/> : null}</div>)

	}
}

