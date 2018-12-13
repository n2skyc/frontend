export default function reducer(state =
																	{
																		data: []
																	}
																, action) {

	if(action.type.includes('FETCH_MONITORING_DATA_FULFILLED')){
		let metric = action.payload;
		state[metric[0].metric.__name__] = metric;
	}
	return {...state}
}
