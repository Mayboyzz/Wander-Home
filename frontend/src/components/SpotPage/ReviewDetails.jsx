import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviewBySpotId } from "../../store/reviews";
import { IoMdStar } from "react-icons/io";

const ReviewDetail = ({ spotId }) => {
	const dispatch = useDispatch();
	const reviews = useSelector((state) => state.reviews.spotReviews);
	const spot = useSelector((state) => state.spots.currentSpot);

	useEffect(() => {
		dispatch(getReviewBySpotId(spotId));
	}, [dispatch, spotId]);

	if (!reviews) return null;

	return (
		<>
			<div className="review-analytics">
				<div style={{ marginTop: "20px" }}>
					<IoMdStar />
					{spot.avgStarRating ? spot.avgStarRating : 0} - {spot.numReviews}{" "}
					{reviews.length === 1 ? "review" : "reviews"}
				</div>
			</div>
			{reviews.map((review) => {
				return (
					<div className="review-section">
						<div className="review-box">
							<h3>{review.User.firstName}</h3>
							<span>{review.createdAt}</span>
							<p>
								{review.review} Lorem ipsum dolor sit amet consectetur,
								adipisicing elit. Id, voluptatum unde. Accusamus reiciendis quas
								molestias voluptatibus libero qui corrupti placeat omnis,
								mollitia reprehenderit sint esse autem magni, dolorem dolor
								consectetur?
							</p>
						</div>
					</div>
				);
			})}
		</>
	);
};

export default ReviewDetail;
