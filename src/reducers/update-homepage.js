const updateHomepage = (state, action) => {

	if (state === undefined) {
		return {
			page: {},
			loading: true,
			error: null
		}
	}

	switch (action.type) {
		// case 'FETCH_HOMEPAGE_REQUESTED':
		// 	return {
		// 		...state,
		// 		homepage: {
		// 			loading: true,
		// 			error: null
		// 		},
		// 	};

		case 'FETCH_HOMEPAGE_SUCCESS':
			return {
				page: action.payload,
				loading: false,
				error: null
			};
		default: return state.homepage;
	}
}

export default updateHomepage;