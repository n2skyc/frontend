import React from 'react';
import RightIcon from './../../../../../res/img/icons/double-angle-arrow-pointing-to-right.svg'
import LeftIcon from './../../../../../res/img/icons/double-left-angle-arrows.svg'
import GreenRightIcon from './../../../../../res/img/icons/right-green.svg'
import GreenLeftIcon from './../../../../../res/img/icons/left-green.svg'
import ChainedIcon from './../../../../../res/img/icons/link.svg'
import UnchainedIcon from './../../../../../res/img/icons/broken-link.svg'

import style from './style.scss'

export default class NavigationPage extends React.Component {

	state = {
		left: LeftIcon,
		right: RightIcon,
		from: 0

	};

	constructor(props) {
		super(props);
	}

	prevPage() {
		let newFrom = this.state.from - this.props.offsetSize;
		newFrom = newFrom < 0 ? 0 : newFrom;
		this.setState({from: newFrom});
		this.props.method(newFrom);
	}

	nextPage() {
		let newFrom = this.state.from + this.props.offsetSize;
		this.setState({from: newFrom});
		this.props.method(newFrom);
	}

	getChainedButton = () => {
		return this.props.chained ? <img onClick={this.props.getModelModeListener.bind(this)} src={ChainedIcon}/> :
			<img onClick={this.props.getModelModeListener.bind(this)} src={UnchainedIcon}/>
	};


	render() {
		return (
			<div>
				<div className="page-nav">
					<img onClick={this.prevPage.bind(this)} onMouseOver={() => this.setState({left: GreenLeftIcon})}
							 onMouseLeave={() => this.setState({left: LeftIcon})} src={this.state.left}/>
					{this.props.chainButtonVisible ? this.getChainedButton() : null}
					<img onClick={this.nextPage.bind(this)} onMouseOver={() => this.setState({right: GreenRightIcon})}
							 onMouseLeave={() => this.setState({right: RightIcon})} src={this.state.right}/>
				</div>
			</div>
		)
	}
}

