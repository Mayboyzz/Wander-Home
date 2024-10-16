const LOAD_SPOTS = "spots/loadSpots";
// const ADD_SPOT = "spots/addSpot";
const LOAD_ONE_SPOT = "spots/loadOneSpot";

const loadSpots = (spots) => {
	return {
		type: LOAD_SPOTS,
		payload: spots,
	};
};

// const addSpot = (spot) => {
// 	return {
// 		type: ADD_SPOT,
// 		payload: spot,
// 	};
// };

export const loadOneSpot = (spot) => {
	return {
		type: LOAD_ONE_SPOT,
		payload: spot,
	};
};
export const getAllSpots = () => async (dispatch) => {
	const response = await fetch("/api/spots");

	if (response.ok) {
		const data = await response.json();

		dispatch(loadSpots(data.Spots));
	}
};

export const getSpotById = (spotId) => async (dispatch) => {
	const response = await fetch("/api/spots/" + spotId);

	if (response.ok) {
		const data = await response.json();
		dispatch(loadOneSpot(data));
	}
};
const initialState = { spots: null, currentSpot: null };

const spotsReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_SPOTS:
			return { ...state, spots: action.payload };
		// case ADD_SPOT:
		// 	return { ...state, spots: action.payload };
		case LOAD_ONE_SPOT:
			return { ...state, currentSpot: action.payload };
		default:
			return state;
	}
};

export default spotsReducer;
