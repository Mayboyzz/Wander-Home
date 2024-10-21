import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots, loadOneSpot } from "../../store/spots";
import "./LandingPage.css";
import { IoMdStar } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { loadReviews } from "../../store/reviews";

function LandingPage() {
	const dispatch = useDispatch();
	const spots = useSelector((state) => state.spots.allSpots);
	useSelector((state) => state.reviews);
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getAllSpots());
		dispatch(loadOneSpot(null));
		dispatch(loadReviews([]));
	}, [dispatch]);

	if (!spots) return null;

	return (
		<div id="spots-list-wrapper">
			<div
				data-testid="spot-list"
				style={{
					display: "flex",
					justifyContent: "center",
					flexWrap: "wrap",
					margin: "0 auto",
				}}
			>
				{spots.map((spot) => {
					return (
						<div
							key={`${spot.id}-landing-page-block`}
							className="spot-block"
							data-testid="spot-tile"
							onClick={() => navigate("/spots/" + spot.id)}
						>
							<a
								data-tooltip-id="my-tooltip"
								data-testid="spot-tooltip"
								data-tooltip-content={spot.name}
								data-tooltip-place="top"
							>
								<img
									data-testid="spot-thumbnail-image"
									src={`${spot.previewImage}`}
								/>
							</a>
							<Tooltip id="my-tooltip" />

							<div className="spot-info">
								<span data-testid="spot-city">
									{spot.city}, {spot.state}
								</span>
								<div className="ratings">
									<IoMdStar />
									<span data-testid="spot-rating">
										{spot.avgRating === "0.0" ? "New" : spot.avgRating}
									</span>
								</div>
							</div>
							<div className="spot-price">
								<span data-testid="spot-price">${spot.price} / night</span>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default LandingPage;
