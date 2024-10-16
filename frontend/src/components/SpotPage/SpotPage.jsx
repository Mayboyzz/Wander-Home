import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllSpots, getSpotById } from "../../store/spots";
import SpotDetail from "./SpotDetail";
import ReviewDetail from "./ReviewDetails";

const SpotPage = () => {
	const { spotId } = useParams();
	const dispatch = useDispatch();

	const spot = useSelector((state) => state.spots.currentSpot);
	const reviews = useSelector((state) => state.reviews.spotReviews);

	useEffect(() => {
		dispatch(getSpotById(spotId));
		dispatch(getAllSpots());
		console.log("reviews", reviews);
	}, [dispatch, spotId, reviews]);

	if (!spot) return null;

	return (
		<div className="spot-page">
			<SpotDetail spot={spot} />
			<ReviewDetail spotId={spot.id} />
		</div>
	);
};

export default SpotPage;
