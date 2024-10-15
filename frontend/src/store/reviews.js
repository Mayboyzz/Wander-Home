const LOAD_REVIEWS = "spots/loadReviews";
// const ADD_SPOT = "spots/addSpot";
// const LOAD_ONE_SPOT = "spots/loadOneSpot";

const loadReviews = (reviews) => {
	return {
		type: LOAD_REVIEWS,
		payload: reviews,
	};
};

// const addSpot = (spot) => {
// 	return {
// 		type: ADD_SPOT,
// 		payload: spot,
// 	};
// };

// export const loadOneSpot = (spot) => {
// 	return {
// 		type: LOAD_ONE_SPOT,
// 		payload: spot,
// 	};
// };
// export const getAllReviews = () => async (dispatch) => {
// 	const response = await fetch("/api/spots");

// 	if (response.ok) {
// 		const data = await response.json();

// 		dispatch(loadSpots(data.Spots));
// 	}
// };

export const getReviewBySpotId = (spotId) => async (dispatch) => {
	const response = await fetch(`/api/spots/${spotId}/reviews`);

	if (response.ok) {
		const data = await response.json();
		console.log(data);
		dispatch(loadReviews(data.Reviews));
	}
};
const initialState = { spotReviews: null };

const reviewsReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_REVIEWS:
			return { ...state, spotReviews: action.payload };
		// case ADD_REVIEW:
		// 	return { ...state, reviews: action.payload };
		// case LOAD_ONE_REVIEW:
		// 	return { ...state, currentSpotReviews: action.payload };
		default:
			return state;
	}
};

export default reviewsReducer;
