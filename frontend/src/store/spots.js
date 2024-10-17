import { csrfFetch } from "./csrf";

const LOAD_SPOTS = "spots/load";
const ADD_SPOT = "spots/addSpot";
const LOAD_ONE_SPOT = "spots/loadOneSpot";
const ADD_IMAGE = "spots/addImage";

const load = (list) => ({
	type: LOAD_SPOTS,
	list,
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
const initialState = {
	allSpots: [],
	currentSpot: null,
	newestSpot: null,
	spotImages: [],
};

const spotsReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_SPOTS: {
			return {
				...state,
				allSpots: action.list.Spots || [],
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
		default:
			return state;
	}
};

export default spotsReducer;
