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
		<>
			<div className="spot-page-header">
				<h1>Manage Your Spots</h1>
				<button onClick={() => navigate("/spots/new")}>
					Create a New Spot
				</button>
			</div>

			<div id="spots-list-wrapper">
				{sortedSpots.map((spot) => {
					return (
						<div key={`${spot.id}-block`} className="spot-block">
							<a
								data-tooltip-id="my-tooltip"
								data-tooltip-content={spot.name}
								data-tooltip-place="top"
							>
								<img
									onClick={() => navigate(`/spots/${spot.id}`)}
									src={`${spot.previewImage}`}
								/>
							</a>
							<Tooltip id="my-tooltip" />

							<div
								onClick={() => navigate(`/spots/${spot.id}`)}
								className="spot-info"
							>
								<span>
									{spot.city}, {spot.state}
								</span>
								<div className="ratings">
									<IoMdStar />
									<span>
										{spot.avgRating === "0.0" ? "New" : spot.avgRating}
									</span>
								</div>
							</div>
							<div
								onClick={() => navigate(`/spots/${spot.id}`)}
								className="spot-price"
							>
								<span>${spot.price} / night</span>
							</div>
							<div style={{ marginTop: "10px" }} className="manage-spot">
								<button
									style={{ marginRight: "10px" }}
									onClick={() => {
										navigate(`/spots/${spot.id}/edit`);
									}}
								>
									Update
								</button>
								<OpenModalButton
									modalComponent={<DeleteSpotModal spotId={spot.id} />}
									buttonText="Delete"
								/>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default CurrentSpotsPage;
