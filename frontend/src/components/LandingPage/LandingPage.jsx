import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots, loadOneSpot } from "../../store/spots";
import "./LandingPage.css";
import { IoMdStar } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

function LandingPage() {
	const dispatch = useDispatch();
	const spots = useSelector((state) => state.spots.allSpots);
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getAllSpots());
		dispatch(loadOneSpot(null));
	}, [dispatch]);

	if (!spots) return null;

	return (
		<>
			<div id="spots-list-wrapper">
				{spots.map((spot) => {
					return (
						<div
							key={`${spot.id}-landing-page-block`}
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
						</div>
					);
				})}
			</div>
		</>
	);
}

export default LandingPage;
