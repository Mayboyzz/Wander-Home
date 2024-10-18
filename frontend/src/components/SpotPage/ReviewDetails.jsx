import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteReviewById, getReviewBySpotId } from "../../store/reviews";
import { IoMdStar } from "react-icons/io";
import OpenModalButton from "../OpenModalButton";
import PostReviewModal from "../PostReviewModal";

const ReviewDetail = ({ spotId }) => {
	const dispatch = useDispatch();

	const reviews = useSelector((state) => state.reviews.spotReviews);
	const spot = useSelector((state) => state.spots.currentSpot);
	const sessionUser = useSelector((state) => state.session.user);

	const reviewed = sessionUser
		? reviews.find((review) => review.userId === sessionUser.id)
		: false;

	useEffect(() => {
		dispatch(getReviewBySpotId(spotId));
	}, [dispatch, spotId]);

	if (!reviews) return null;

	return (
		<>
			<div className="review-analytics">
				<div style={{ marginTop: "20px" }}>
					<IoMdStar />
					{spot.numReviews === 0 && <span>New</span>}
					{spot.numReviews === 1 && (
						<span>
							{spot.avgStarRating} - {spot.numReviews} Review
						</span>
					)}
					{spot.numReviews > 1 && (
						<span>
							{spot.avgStarRating} - {spot.numReviews} Reviews
						</span>
					)}
				</div>
			</div>
			<div>
				{sessionUser && spot.ownerId !== sessionUser.id && !reviewed && (
					<>
						<OpenModalButton
							buttonText="Post Your Review"
							modalComponent={<PostReviewModal />}
						/>
					</>
				)}
			</div>
			<div style={{ marginTop: "10px" }}>
				{sessionUser && spot.numReviews === 0 && (
					<>
						<span>Be the first to post a review!</span>
					</>
				)}
			</div>
			{reviews.toReversed().map((review) => {
				return (
					<div key={review.id} className="review-section">
						<div className="review-box">
							{spot.numReviews >= 1 && (
								<>
									<h3>{review.User?.firstName}</h3>
									<span>{review.createdAt}</span>
									<p>{review.review}</p>
									{sessionUser && sessionUser.id === review.userId && (
										<button
											onClick={() => {
												dispatch(deleteReviewById(review.id));
												dispatch(getReviewBySpotId(spotId));
											}}
										>
											Delete
										</button>
									)}
								</>
							)}
						</div>
					</div>
				);
			})}
		</>
	);
};

export default ReviewDetail;
