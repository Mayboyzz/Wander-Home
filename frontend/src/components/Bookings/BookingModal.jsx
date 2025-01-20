import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBooking } from "../../store/bookings";
import { useModal } from "../../context/Modal";

export const BookingModal = () => {
	const dispatch = useDispatch();
	const currentSpot = useSelector((state) => state.spots.currentSpot);
	const { closeModal } = useModal();
	const [startDate, setStartDate] = useState(
		new Date().toISOString().split("T")[0],
	);
	const [endDate, setEndDate] = useState(
		new Date().toISOString().split("T")[0],
	);

	const handleStartDateChange = (e) => {
		setStartDate(e.target.value);
	};

	const handleEndDateChange = (e) => {
		setEndDate(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		return dispatch(createBooking(currentSpot.id, { startDate, endDate }))
			.then(closeModal)
			.catch(async (res) => {
				const data = await res.json();
				if (data?.errors) {
					setErrors(data.errors);
				}
			});
	};

	return (
		<div className="p-4">
			<h1 className="text-center text-2xl font-bold mb-4">
				Reserve this spot!
			</h1>
			<div className="flex text-center justify-center">
				<div className="border-2 rounded-lg p-2 mr-1">
					<h1>Start Date:</h1>
					<input
						type="date"
						min={new Date().toISOString().split("T")[0]}
						onChange={handleStartDateChange}
					/>
				</div>
				<div className="border-2 rounded-lg p-2 ml-1">
					<h1>End Date:</h1>
					<input type="date" min={startDate} onChange={handleEndDateChange} />
				</div>
			</div>
			<div className="flex justify-center mt-4">
				<button
					type="submit"
					className="bg-[#FF385C] text-white p-2 rounded-lg"
					onClick={handleSubmit}
				>
					Reserve
				</button>
			</div>
		</div>
	);
};
