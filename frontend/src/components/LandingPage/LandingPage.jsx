import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots, loadOneSpot } from "../../store/spots";
import "./LandingPage.css";
import { IoMdStar } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function LandingPage() {
	const dispatch = useDispatch();
	const allSpots = useSelector((state) => state.spots);
	const navigate = useNavigate();
	let count = 0;

	useEffect(() => {
		dispatch(getAllSpots());
		dispatch(loadOneSpot(null));
	}, [dispatch]);

	if (!allSpots.spots) return null;

	console.log("Landing Page");
	return (
		<div id="spots-list-wrapper">
			{allSpots.spots.map((spot) => {
				return (
					<div className="spot-block">
						<img
							onClick={() => navigate("/spots/" + spot.id)}
							src="/pexels-binyaminmellish-1396122.jpg"
						/>

						<div className="spot-info">
							<span>
								{spot.city}, {spot.state}
							</span>
							<div className="ratings">
								<IoMdStar />
								<span>{spot.avgRating}</span>
							</div>
						</div>
						<div className="spot-price">
							<span>${spot.price} / night</span>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default LandingPage;
