import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpotById, loadOneSpot } from "../../store/spots";
import SpotDetail from "./SpotDetail";
import ReviewDetail from "./ReviewDetails";
import { getReviewBySpotId } from "../../store/reviews";

const SpotPage = () => {
	const { spotId } = useParams();
	const dispatch = useDispatch();

	const spot = useSelector((state) => state.spots.currentSpot);

	useEffect(() => {
		dispatch(loadOneSpot(null));
		dispatch(getSpotById(spotId));
		dispatch(getReviewBySpotId(spotId));
	}, [dispatch, spotId]);

	if (!spot) return null;

	return (
		<div className="max-w-[1120px] mx-auto px-6 py-8">
			<SpotDetail spot={spot} />
			<ReviewDetail spotId={spot.id} />
		</div>
	);
};

export default SpotPage;
