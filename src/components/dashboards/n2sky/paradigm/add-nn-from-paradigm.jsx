import React from 'react';
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import {SCHEMA} from "./schema";
import {createVinnslDescription, getVinnslDescriptionById} from "../../../../actions/n2sky/vinnsl_actions";
import {addNNIdProject} from '../../../../actions/n2sky/project-actions'
import RightArrowIcon from './../../../../../res/img/icons/right-arrow-white.svg'

import NNDescription from './components/nn-description'
import NNStructure from './components/nn-structure'
import Loader from "../../../core/loader/loader";
import NNTraining from "./components/nn-training";

export const label_nn_desc = "Neural network Description";
export const label_nn_structure = "Neural Network Structure";
export const label_nn_training = "Neural Network Training";


@connect((store) => {
	return {
		vinnslCreate: store.vinnslCreate,
		descriptionById: store.descriptionById
	}
})
export default class AddNNFromParadigm extends React.Component {

	constructor(props) {
		super(props);
		this.commitCreatorMetadataProblemDomain = ::this.commitCreatorMetadataProblemDomain;
		this.commitStructure = ::this.commitStructure;
		this.changeActiveTab = ::this.changeActiveTab;
		this.createVinnslDescriptionFromParadigm = ::this.createVinnslDescriptionFromParadigm;

		this.state = {
			activeTab: this.props.route.readOnly ? label_nn_training : label_nn_desc,
			schema: null,
			nn_rep: {
				structure_rep: {}
			}
		};
		if (this.props.params.id && this.props.route.readOnly) {
			this.props.dispatch(getVinnslDescriptionById(this.props.params.id)).then(() => {
			})
		}
	}

	componentDidMount() {
		this.setState({schema: SCHEMA})
	}

	getActiveTab = () => {
		let activeStyle = {
			backgroundColor: 'dimgrey'
		};

		return <nav className="topbar">
			<ul>
				{this.state.activeTab === label_nn_desc ?
					<li><span className="no-action" style={activeStyle}>{label_nn_desc}</span></li> :
					<li><span className="no-action"
										onClick={this.changeActiveTab.bind(this, label_nn_desc, true)}>{label_nn_desc}</span></li>}

				<li><span className="no-action"><img src={RightArrowIcon}/></span></li>

				{this.state.activeTab === label_nn_structure ?
					<li><span className="no-action" style={activeStyle}>{label_nn_structure}</span></li> :
					<li><span className="no-action"
										onClick={this.changeActiveTab.bind(this, label_nn_structure, true)}>{label_nn_structure}</span>
					</li>}

				<li><span className="no-action"><img src={RightArrowIcon}/></span></li>

				{this.state.activeTab === label_nn_training ?
					<li><span className="no-action" style={activeStyle}>{label_nn_training}</span></li> :
					<li><span onClick={this.changeActiveTab.bind(this, label_nn_training, true)}
										className="no-action">{label_nn_training}</span></li>}
			</ul>
		</nav>
	};

	commitCreatorMetadataProblemDomain(obj) {
		this.setState({
			schema: {
				...this.state.schema,
				metadata: obj.metadata,
				creator: obj.creator,
				problemDomain: obj.problemDomain
			}
		});
		return this.state.schema;
	}


	commitStructure(obj) {
		this.setState(prevState => ({
			...prevState,
			schema: {
				...prevState.schema,
				structure: {
					...prevState.schema.structure,
					inputLayer: {
						...prevState.schema.structure.inputLayer,
						result: {nodesId: obj.input}
					},
					outputLayer: {
						...prevState.schema.structure.outputLayer,
						result: {nodesId: obj.output}
					},
					hiddenLayer: {
						...prevState.schema.structure.outputLayer,
						result: {dimensions: obj.hidden}
					},
					connections: obj.connections
				}
			},
			nn_rep: {
				...prevState.nn_rep,
				structure_rep: obj.structure_rep
			}
		}));
		return this.state.schema;
	}

	createVinnslDescriptionFromParadigm = () => {
		this.props.dispatch(createVinnslDescription(this.state.schema)).then(() => {
			this.props.dispatch(addNNIdProject(this.props.params.projectid, {nn_id: this.props.vinnslCreate.vinnsl.id}));
			browserHistory.push('/n2sky/paradigm/nn/' + this.props.vinnslCreate.vinnsl.id);
			location.reload();
		});
	};


	changeActiveTab = (activeTab, isClick = false) => {
		if (isClick && this.props.route.readOnly || !isClick) {
			this.setState({activeTab: activeTab})
		}
	};

	render() {
		return (
			<div>
				{this.state.schema ? <div>
						{this.getActiveTab()}
						{this.state.activeTab === label_nn_desc ?
							<NNDescription readOnly={this.props.route.readOnly} description={this.props.route.readOnly ? this.props.descriptionById.description : null}
														 changeActiveTab={this.changeActiveTab}
														 commitCreatorMetadataProblemDomain={this.commitCreatorMetadataProblemDomain}
														 schema={this.state.schema}/> : null}
						{this.state.activeTab === label_nn_structure ?
							<NNStructure description={this.props.route.readOnly ? this.props.descriptionById.description : null}
													 changeActiveTab={this.changeActiveTab}
													 commitStructure={this.commitStructure}
													 createVinnslDescriptionFromParadigm={this.createVinnslDescriptionFromParadigm}/> : null}

						{this.state.activeTab === label_nn_training && this.props.descriptionById.description ?
							<NNTraining description={this.props.descriptionById.description}/> : null}
					</div>
					: <Loader/>}

			</div>
		)
	}
}

