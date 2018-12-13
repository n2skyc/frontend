export default function reducer(state = {
	networks: {},
	extensions: {},
	subnetpools: {},
	service_providers: {}
}, action) {
	if (action.type.includes('FETCH_NETRON_FULFILLED')) {
		state[Object.keys(action.payload)[0]] = action.payload;
	}
	return {...state}
}
