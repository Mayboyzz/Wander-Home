import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllSpots, loadOneSpot } from "../../store/spots";
import { IoMdStar } from "react-icons/io";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import OpenModalButton from "../OpenModalButton";
import DeleteSpotModal from "./DeleteSpotModal";

const CurrentSpotsPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const spots = useSelector((state) => state.spots.allSpots);
	const sessionUser = useSelector((state) => state.session.user);
	const currentSpots = spots.filter((spot) => spot.ownerId === sessionUser.id);

	const sortedSpots = currentSpots.sort((a, b) => b.id - a.id);

	useEffect(() => {
		dispatch(getAllSpots());
		dispatch(loadOneSpot(null));
	}, [dispatch]);

	if (!currentSpots) return null;

	return (
		<div className="max-w-7xl mx-auto px-4 py-8">
			<div className="mb-6 flex justify-between items-center">
				<h1 className="text-2xl font-semibold text-neutral-600">
					Manage Your Spots
				</h1>
				<button
					type="button"
					onClick={() => navigate("/spots/new")}
					className="bg-babu text-white px-4 py-2 rounded-lg hover:bg-kazan transition-colors"
				>
					Create a New Spot
				</button>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{sortedSpots.map((spot) => (
					<div key={`${spot.id}-block`} className="cursor-pointer group">
						<div className="aspect-square mb-3 rounded-airbnb-lg overflow-hidden">
							<img
								type="button"
								onClick={() => navigate(`/spots/${spot.id}`)}
								onKeyUp={() => navigate(`/spots/${spot.id}`)}
								src={`${spot.previewImage}`}
								alt={spot.name}
								data-tooltip-id="my-tooltip"
								data-tooltip-content={spot.name}
								data-tooltip-place="top"
								onError={(e) => {
									e.target.src = "https://placehold.co/100x100?text=No+Image";
								}}
								className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
							/>
						</div>
						<Tooltip id="my-tooltip" />

						<div className="space-y-1">
							<div className="flex justify-between items-start">
								<h3 className="text-neutral-600 font-medium">
									{spot.city}, {spot.state}
								</h3>
								<div className="flex items-center gap-1 text-neutral-600">
									<IoMdStar className="text-sm" />
									<span className="text-sm">
										{spot.avgRating === "0.0" ? "New" : spot.avgRating}
									</span>
								</div>
							</div>
							<p className="text-neutral-500 mt-1">
								<span className="font-semibold text-neutral-600">
									${spot.price}
								</span>
								<span className="text-neutral-500"> night</span>
							</p>
							<div className="flex gap-2 mt-2">
								<button
									type="button"
									onClick={(e) => {
										e.stopPropagation();
										navigate(`/spots/${spot.id}/edit`);
									}}
									className="bg-babu text-white px-4 py-1 rounded-lg hover:bg-kazan transition-colors text-sm flex-1"
								>
									Update
								</button>
								<div className="flex-1">
									<OpenModalButton
										modalComponent={<DeleteSpotModal spotId={spot.id} />}
										buttonText="Delete"
										className="bg-rausch text-white px-4 py-1 rounded-lg hover:bg-hackberry transition-colors text-sm w-full"
									/>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default CurrentSpotsPage;
