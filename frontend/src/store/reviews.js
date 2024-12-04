import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = "spots/loadReviews";
const ADD_REVIEW = "spots/addReview";
const REMOVE_REVIEW = "spots/removeReview";

export const loadReviews = (reviews) => {
	return {
		type: LOAD_REVIEWS,
		payload: reviews,
	};
};

const addReview = (review) => {
	return {
		type: ADD_REVIEW,
		payload: review,
	};
};

const removeReview = (review) => {
	return {
		type: REMOVE_REVIEW,
		payload: review,
	};
};

export const createReview = (spotId, review) => async (dispatch) => {
	const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(review),
	});

	if (response.ok) {
		const data = await response.json();
		await dispatch(addReview(data));
		await dispatch(getReviewBySpotId(spotId));
	}
};

export const getReviewBySpotId = (spotId) => async (dispatch) => {
	const response = await fetch(`/api/spots/${spotId}/reviews`);

	if (response.ok) {
		const data = await response.json();

		dispatch(loadReviews(data.Reviews));
	}
};

export const deleteReviewById = (reviewId, spotId) => async (dispatch) => {
	const response = await csrfFetch(`/api/reviews/${reviewId}`, {
		method: "DELETE",
	});

	if (response.ok) {
		await dispatch(removeReview({ id: reviewId }));
		await dispatch(getReviewBySpotId(spotId));
	}
};
const initialState = { SpotReviews: [] };

// biome-ignore lint/style/useDefaultParameterLast: <explanation>
const reviewsReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case LOAD_REVIEWS:
			newState = { ...state };
			newState.SpotReviews = action.payload;
			return newState;
		case ADD_REVIEW:
			newState = { ...state };
			newState.SpotReviews = [...state.SpotReviews, action.payload];
			return newState;
		case REMOVE_REVIEW:
			newState = { ...state };
			newState.SpotReviews = state.SpotReviews.filter(
				(review) => review.id !== action.payload.id,
			);
			return newState;
		default:
			return state;
	}
};

export default reviewsReducer;
