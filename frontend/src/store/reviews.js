import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = "spots/loadReviews";
const ADD_REVIEW = "spots/addReview";
const REMOVE_REVIEW = "spots/removeReview";

const loadReviews = (reviews) => {
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

		dispatch(addReview(data));
	}
};

export const getReviewBySpotId = (spotId) => async (dispatch) => {
	const response = await fetch(`/api/spots/${spotId}/reviews`);

	if (response.ok) {
		const data = await response.json();

		dispatch(loadReviews(data.Reviews));
	}
};

export const deleteReviewById = (reviewId) => async (dispatch) => {
	const response = await csrfFetch(`/api/reviews/${reviewId}`, {
		method: "DELETE",
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(removeReview(data));
	}
};
const initialState = { spotReviews: [] };

const reviewsReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_REVIEWS:
			return { ...state, spotReviews: action.payload };
		case ADD_REVIEW:
			return { ...state, spotReviews: [...state.spotReviews, action.payload] };
		case REMOVE_REVIEW:
			return {
				...state,
				spotReviews: state.spotReviews.filter(
					(review) => review.id !== action.payload
				),
			};
		default:
			return state;
	}
};

export default reviewsReducer;
