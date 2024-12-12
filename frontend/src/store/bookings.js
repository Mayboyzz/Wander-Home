import { csrfFetch } from "./csrf";

const LOAD_BOOKING = "spots/loadBookings";
const ADD_BOOKING = "spots/addBooking";
const REMOVE_BOOKING = "spots/removeBooking";

export const loadBookings = (spot) => {
	return {
		type: LOAD_BOOKING,
		payload: spot,
	};
};

const addBookings = (booking) => {
	return {
		type: ADD_BOOKING,
		payload: booking,
	};
};

const removeBooking = (bookingId) => {
	return {
		type: REMOVE_BOOKING,
		payload: bookingId,
	};
};

export const createBooking = (spotId, booking) => async (dispatch) => {
	const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(booking),
	});

	if (response.ok) {
		const data = await response.json();
		await dispatch(addBookings(data));
	}
};

export const getCurrentUsersBookings = () => async (dispatch) => {
	const response = await fetch(`/api/bookings/current`);

	if (response.ok) {
		const data = await response.json();

		dispatch(loadBookings(data));
	}
};

export const deleteReviewById = (bookingId) => async (dispatch) => {
	const response = await csrfFetch(`/api/bookings/${bookingId}`, {
		method: "DELETE",
	});

	if (response.ok) {
		await dispatch(removeBooking(bookingId));
		await dispatch(getCurrentUsersBookings());
	}
};

const initialState = { UserBookings: [] };

const bookingsReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case LOAD_BOOKING:
			newState = { ...state };
			newState.UserBookings = action.payload;
			return newState;
		case ADD_BOOKING:
			newState = { ...state };
			newState.UserBookings = [...state.UserBookings, action.payload];
			return newState;
		case REMOVE_BOOKING:
			newState = { ...state };
			newState.UserBookings = state.UserBookings.filter(
				(booking) => booking.id !== action.payload.id
			);
			return newState;
		default:
			return state;
	}
};

export default bookingsReducer;
