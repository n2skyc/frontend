import {LineChart} from 'react-easy-chart';
import React from 'react';
import {connect} from 'react-redux'

@connect((store) => {
	return {
		browser: store.browser
	}
})
export default class TrainingChart extends React.Component {

	constructor(props) {
		super(props);
		// console.log(this.props.data);
		console.log(this.props.data.slice(0, 10))
	}

	render() {
		let style = 100;
		if(this.props.browser.is.small || this.props.browser.is.extraSmall) {
			style = 10;
		} else if (this.props.browser.is.medium || this.props.browser.large) {
			style = 50;
		}
		return (
			<div style={{backgroundColor: "#FFF", margin: '10px'}}>
				<LineChart
					lineColors={['#B91C1F']}
					axes
					grid
					verticalGrid
					interpolate={'cardinal'}
					width={document.body.clientWidth - style}
					height={250}
					axisLabels={{x: 'Epoches', y: 'Loss'}}
					style={{
						".label": {
							color: "red"
						}
					}}
					data={[this.props.data]}
				/>
			</div>
		)
	}
};
