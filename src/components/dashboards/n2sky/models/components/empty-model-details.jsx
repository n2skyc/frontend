import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router'
import style from './style.scss'
import LeftIcon from './../../../../../../res/img/icons/pointing-left.svg'

@connect((store) => {
	return {}
})
export default class EmptyModelDetails extends React.Component {


	state = {}

	constructor(props) {
		super(props);

	}


	render() {
		return (
			<div>
				<div className="empty-section">
					<button className='lined thin'>Choose a model</button>
					{/*<button className='dotted thin'>Dotted Thin</button>*/}
					{/*<button className='dashed thin'>Dashed Thin</button>*/}
				</div>
				<div className="pointer-img">
					<img src={LeftIcon}/>
				</div>
			</div>
		)
	}
}

