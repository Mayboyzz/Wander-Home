import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllSpots } from "../../store/spots";
import { IoMdStar } from "react-icons/io";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

const CurrentSpotsPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const spots = useSelector((state) => state.spots.allSpots);
	const sessionUser = useSelector((state) => state.session.user);

	const currentSpots = spots.filter((spot) => spot.ownerId === sessionUser.id);

	useEffect(() => {
		dispatch(getAllSpots());
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
				{currentSpots.toReversed().map((spot) => {
					return (
						<>
							<div
								className="spot-block"
								onClick={() => navigate("/spots/" + spot.id)}
							>
								<a
									data-tooltip-id="my-tooltip"
									data-tooltip-content={spot.name}
									data-tooltip-place="top"
								>
									<img src={`${spot.previewImage}`} />
								</a>
								<Tooltip id="my-tooltip" />

								<div className="spot-info">
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
								<div className="spot-price">
									<span>${spot.price} / night</span>
								</div>
								<div className="manage-spot">
									<button onClick={() => navigate(`/spots/${spot.id}/edit`)}>
										Update
									</button>
									<button>Delete</button>
								</div>
							</div>
						</>
					);
				})}
			</div>
		</>
	);
};

export default CurrentSpotsPage;
