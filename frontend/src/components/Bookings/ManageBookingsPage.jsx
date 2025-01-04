import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUsersBookings } from "../../store/bookings";
import { useNavigate } from "react-router-dom";

const normalizeDates = (startDate, endDate) => {
	const options = { month: "short", day: "numeric" };
	const start = new Date(startDate);
	const end = new Date(endDate);

	// Get the formatted parts for start and end dates
	const startFormatted = new Intl.DateTimeFormat("en-US", options).format(
		start
	);
	const endDay = new Intl.DateTimeFormat("en-US", { day: "numeric" }).format(
		end
	);

	return `${startFormatted.split(" ")[0]} ${
		startFormatted.split(" ")[1]
	}-${endDay}`;
};

const DateRange = ({ startDate, endDate }) => {
	const normalizedDate = normalizeDates(startDate, endDate);

	return <div>{normalizedDate}</div>;
};

export const ManageBookings = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const upcomingBookings = useSelector(
		(state) => state.bookings.upcomingBookings
	);
	const pastBookings = useSelector((state) => state.bookings.pastBookings);

	useEffect(() => {
		dispatch(getCurrentUsersBookings());
	}, [dispatch]);

	if (!upcomingBookings) return <h1>You have no bookings!</h1>;
	if (!pastBookings) return <h1>You have no bookings!</h1>;

	return (
		<>
			<div className="m-4">
				<h1 className="font-bold py-4 text-xl">Upcoming reservations</h1>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{upcomingBookings?.map((booking) => {
						const start = new Date(booking.startDate);
						console.log(start < todayDate);
						return (
							<div
								key={`${booking.id}-landing-page-block`}
								onClick={() => navigate(`/spots/${booking.Spot.id}`)}
								onKeyUp={(e) => {
									if (e.key === "Enter") {
										navigate(`/spots/${booking.Spot.id}`);
									}
								}}
								className="cursor-pointer group"
							>
								<div className="aspect-square mb-3 rounded-airbnb-lg overflow-hidden">
									<img
										src={booking.Spot.previewImage}
										alt={`Preview of ${booking.Spot.name}`}
										onError={(e) => {
											e.target.src =
												"https://placehold.co/100x100?text=No+Image";
										}}
										className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
									/>
								</div>

								<div className="space-y-1">
									<div className="flex justify-between items-start">
										<h3 className="text-neutral-600 font-medium">
											{booking.Spot.city}, {booking.Spot.state}
										</h3>
									</div>
									<DateRange
										startDate={booking?.startDate}
										endDate={booking?.endDate}
									/>
								</div>
							</div>
						);
					})}
				</div>
				<div className="mt-4">
					<h1 className="font-bold py-4 text-xl">Past reservations</h1>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{pastBookings?.map((booking) => {
							return (
								<div
									key={`${booking.id}-landing-page-block`}
									onClick={() => navigate(`/spots/${booking.Spot.id}`)}
									onKeyUp={(e) => {
										if (e.key === "Enter") {
											navigate(`/spots/${booking.Spot.id}`);
										}
									}}
									className="cursor-pointer group"
								>
									<div className="aspect-square mb-3 rounded-airbnb-lg overflow-hidden">
										<img
											src={booking.Spot.previewImage}
											alt={`Preview of ${booking.Spot.name}`}
											onError={(e) => {
												e.target.src =
													"https://placehold.co/100x100?text=No+Image";
											}}
											className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
										/>
									</div>

									<div className="space-y-1">
										<div className="flex justify-between items-start">
											<h3 className="text-neutral-600 font-medium">
												{booking.Spot.city}, {booking.Spot.state}
											</h3>
										</div>
										<DateRange
											startDate={booking?.startDate}
											endDate={booking?.endDate}
										/>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
};
