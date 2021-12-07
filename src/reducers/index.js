import updateHomepage from './update-homepage';

const reducer = (state, action) => {

	return {
		homepage: updateHomepage(state, action)
	}

};

export default reducer;