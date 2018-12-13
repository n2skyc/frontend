export default function reducer(state = {}, action) {

	if(action.type.includes('FETCH_SERVER_INFO_FULFILLED')){
		state[Object.keys(action.payload)[0]] = action.payload;
	}
	return {...state}
}
