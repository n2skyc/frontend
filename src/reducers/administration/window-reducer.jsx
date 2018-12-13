export default function reducer(state =
																{
																	fetched: false,
																	error: null
																}
	, action) {
	console.log(state);
	switch (action.type) {
		case 'RESIZE': {
			return {
				...state,
				mobile: 850,
				post: action.payload
			}
		}
		default: {
			return {...state}
		}
	}
}
