import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots, loadOneSpot, setUserLocation } from "../../store/spots";
import { IoMdStar } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { loadReviews } from "../../store/reviews";

function LandingPage() {
	const dispatch = useDispatch();
	const spots = useSelector((state) => state.spots.allSpots);
	const userLocation = useSelector((state) => state.spots.userLocation);
	const navigate = useNavigate();

	const calculateDistance = (lat1, lon1, lat2, lon2) => {
		const R = 3959;
		const dLat = (lat2 - lat1) * (Math.PI / 180);
		const dLon = (lon2 - lon1) * (Math.PI / 180);
		const a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(lat1 * (Math.PI / 180)) *
				Math.cos(lat2 * (Math.PI / 180)) *
				Math.sin(dLon / 2) *
				Math.sin(dLon / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		const distance = R * c;
		return Math.round(distance);
	};

	useEffect(() => {
		if (!userLocation && "geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					dispatch(
						setUserLocation({
							lat: position.coords.latitude,
							lng: position.coords.longitude,
						})
					);
				},
				(error) => {
					console.error("Error getting location:", error);
				}
			);
		}
	}, [dispatch, userLocation]);

	useEffect(() => {
		dispatch(getAllSpots());
		dispatch(loadOneSpot(null));
		dispatch(loadReviews([]));
	}, [dispatch]);

	if (!spots) return null;

	return (
		<div className="max-w-7xl mx-auto px-4 py-8">
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{spots.map((spot) => {
					const distance =
						userLocation && spot.lat && spot.lng
							? calculateDistance(
									userLocation.lat,
									userLocation.lng,
									Number.parseFloat(spot.lat),
									Number.parseFloat(spot.lng)
							  )
							: null;

					return (
						<div
							key={`${spot.id}-landing-page-block`}
							onClick={() => navigate(`/spots/${spot.id}`)}
							onKeyUp={(e) => {
								if (e.key === "Enter") {
									navigate(`/spots/${spot.id}`);
								}
							}}
							className="cursor-pointer group"
						>
							<div className="aspect-square mb-3 rounded-airbnb-lg overflow-hidden">
								<img
									src={spot.previewImage}
									alt={`Preview of ${spot.name}`}
									onError={(e) => {
										e.target.src = "https://placehold.co/100x100?text=No+Image";
									}}
									className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
								/>
							</div>

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
								<p className="text-neutral-500 text-sm">
									{distance
										? `${distance} miles away`
										: "Distance not available"}
								</p>
								{/* <p className="text-neutral-500 text-sm">Jan 21-26</p> */}
								<p className="text-neutral-600 mt-1">
									<span className="font-semibold">${spot.price}</span>
									<span className="text-neutral-600"> night</span>
								</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default LandingPage;
