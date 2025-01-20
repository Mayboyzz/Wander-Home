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
	const response = await csrfFetch("/api/bookings/current");

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

const initialState = { upcomingBookings: [], pastBookings: [] };

const bookingsReducer = (state = initialState, action) => {
	let newState;
	const todayDate = new Date();

	switch (action.type) {
		case LOAD_BOOKING:
			newState = { ...state };
			newState.upcomingBookings = action.payload.Bookings.filter(
				(booking) => new Date(booking.startDate) > todayDate,
			);
			newState.pastBookings = action.payload.Bookings.filter(
				(booking) => new Date(booking.startDate) < todayDate,
			);
			return newState;
		case ADD_BOOKING:
			newState = { ...state };
			newState.upcomingBookings = [...state.upcomingBookings, action.payload];
			return newState;
		case REMOVE_BOOKING:
			newState = { ...state };
			newState.upcomingBookings = state.upcomingBookings.filter(
				(booking) => booking.id !== action.payload.id,
			);
			return newState;
		default:
			return state;
	}
};

export default bookingsReducer;
