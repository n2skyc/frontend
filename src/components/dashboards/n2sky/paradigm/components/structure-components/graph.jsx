import React from 'react';
import {ReactCytoscape, cytoscape} from 'react-cytoscape';

export default class NNGraph extends React.Component {

	constructor(props) {
		super(props);
	}


	getVisualizations() {

		let style = [ // the stylesheet for the graph
			{
				selector: 'node',
				style: {
					'background-color': '#d1d1d1',
					'height': "15px",
					"width": "15px",
					// 'label': 'data(id)',
					'color': '#FFF',
					'font-size': "10px"
				}
			},

			{
				selector: 'edge',
				style: {
					'width': 1,
					'line-color': '#ccc',
					'target-arrow-color': '#ccc',
					'target-arrow-shape': 'triangle'
				}
			},
			{
				"selector": "edge.unbundled-bezier-up",
				"style": {
					"curve-style": "unbundled-bezier",
					"control-point-distances": -120,
					"control-point-weights": 0.5
				}
			},
			{
				"selector": "edge.unbundled-bezier-down",
				"style": {
					"curve-style": "unbundled-bezier",
					"control-point-distances": 120,
					"control-point-weights": 0.1
				}
			}
		];

		return <div className="cyt-container"><ReactCytoscape containerID="cy"
																													elements={this.props.elements}
																													cyRef={(cy) => {
																														this.cyRef(cy)
																													}}
																													cytoscapeOptions={{wheelSensitivity: 0.1}}
																													style={style}
																													pan={{x: 0, y: 0}}
																													layout={{name: 'preset'}}/>
		</div>
	}

	cyRef(cy) {
		this.cy = cy;
		cy.on('tap', 'node', function (evt) {
			let node = evt.target;
			console.log('tapped ' + node.id());

		});
	}

	render() {
		return (
			<div>
				{this.getVisualizations()}
			</div>
		)
	}
}

