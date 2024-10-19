import { csrfFetch } from "./csrf";

const LOAD_SPOTS = "spots/load";

const ADD_SPOT = "spots/addSpot";
const LOAD_ONE_SPOT = "spots/loadOneSpot";
const ADD_IMAGE = "spots/addImage";
const UPDATE_SPOT = "spots/updateSpot";
const DELETE_SPOT = "spots/deleteSpot";

const load = (spots) => ({
	type: LOAD_SPOTS,
	spots,
});

const addSpot = (spot) => {
	return {
		type: ADD_SPOT,
		payload: spot,
	};
};

const addImage = (image) => {
	return {
		type: ADD_IMAGE,
		image,
	};
};

const update = (spot) => {
	return {
		type: UPDATE_SPOT,
		spot,
	};
};

const deleteSpot = (spotId) => {
	return {
		type: DELETE_SPOT,
		spotId,
	};
};

export const loadOneSpot = (spot) => {
	return {
		type: LOAD_ONE_SPOT,
		payload: spot,
	};
};
export const getAllSpots = () => async (dispatch) => {
	const response = await fetch("/api/spots");

	if (response.ok) {
		const list = await response.json();
		dispatch(load(list));
	}
};

export const getSpotById = (spotId) => async (dispatch) => {
	const response = await fetch("/api/spots/" + spotId);

	if (response.ok) {
		const data = await response.json();
		dispatch(loadOneSpot(data));
	}
};

export const createSpot = (spot) => async (dispatch) => {
	const response = await csrfFetch("/api/spots", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(spot),
	});

	const newSpot = await response.json();
	dispatch(addSpot(newSpot));
	return newSpot;
};

export const addImageToSpot = (spotId, image) => async (dispatch) => {
	const response = await csrfFetch(`/api/spots/${spotId}/images`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(image),
	});

	if (response.ok) {
		const newImage = await response.json();
		dispatch(addImage(newImage));
		return newImage;
	}
};

export const updateSpot = (spotId, spot) => async (dispatch) => {
	const response = await csrfFetch(`/api/spots/${spotId}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(spot),
	});

	if (response.ok) {
		const updatedSpot = await response.json();
		dispatch(update(updatedSpot));
		// return updatedSpot;
	}
};

export const deleteSpotById = (spotId) => async (dispatch) => {
	const response = await csrfFetch(`/api/spots/${spotId}`, {
		method: "DELETE",
	});

	if (response.ok) {
		dispatch(deleteSpot(spotId));
	}
};

const initialState = {
	allSpots: [],
	currentSpot: null,
	newestSpot: null,
	spotImages: [],
};

const spotsReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_SPOTS: {
			const sortedSpots = action.spots.Spots
				? action.spots.Spots.sort(
						(a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
				  )
				: [];

			return {
				...state,
				allSpots: sortedSpots,
			};
		}
		case ADD_SPOT:
			return {
				...state,
				allSpots: [...state.allSpots, action.payload],
				newestSpot: action.payload,
			};
		case LOAD_ONE_SPOT:
			return { ...state, currentSpot: action.payload };

		case ADD_IMAGE:
			return {
				...state,
				spotImages: [...state.spotImages, action.image],
			};
		case UPDATE_SPOT: {
			const updatedSpots = state.allSpots.map((spot) =>
				spot.id === action.spot.id ? action.spot : spot
			);

			const sortedSpots = updatedSpots.sort(
				(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
			);

			return {
				...state,
				allSpots: sortedSpots,
				currentSpot: action.spot,
			};
		}

		case DELETE_SPOT:
			return {
				...state,
				allSpots: state.allSpots.filter((spot) => spot.id !== action.spotId),
			};
		default:
			return state;
	}
};

export default spotsReducer;
