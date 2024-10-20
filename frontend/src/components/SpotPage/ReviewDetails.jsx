import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviewBySpotId } from "../../store/reviews";
import { IoMdStar } from "react-icons/io";
import OpenModalButton from "../OpenModalButton";
import PostReviewModal from "../PostReviewModal";
import { getAllSpots, getSpotById } from "../../store/spots";
import DeleteReviewModal from "./DeleteReviewModal";

const ReviewDetail = ({ spotId }) => {
	const dispatch = useDispatch();

	const reviews = useSelector((state) => state.reviews.spotReviews);
	const spot = useSelector((state) => state.spots.currentSpot);
	const sessionUser = useSelector((state) => state.session.user);

	const reviewed = sessionUser
		? reviews.find((review) => review.userId === sessionUser.id)
		: false;

	useEffect(() => {
		dispatch(getSpotById(spotId));
		dispatch(getReviewBySpotId(spotId));
		dispatch(getAllSpots());
	}, [dispatch, spotId]);

	if (!reviews) return null;

	return (
		<>
			<div className="review-analytics">
				<div style={{ marginTop: "20px", marginBottom: "10px" }}>
					<IoMdStar />
					{spot.numReviews === 0 && <span>New</span>}
					{spot.numReviews === 1 && (
						<span>
							{spot.avgStarRating} &#183; {spot.numReviews} Review
						</span>
					)}
					{spot.numReviews > 1 && (
						<span>
							{spot.avgStarRating} &#183; {spot.numReviews} Reviews
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
				const formatter = new Intl.DateTimeFormat("en-US", {
					year: "numeric",
					month: "long",
				});
				const date = new Date(review.createdAt);
				return (
					<div key={review.id} className="review-section">
						<div className="review-box">
							{spot.numReviews >= 1 && (
								<>
									<h3>{review.User?.firstName}</h3>
									<span>{formatter.format(date)}</span>
									<p>{review.review}</p>
									{sessionUser && sessionUser.id === review.userId && (
										<OpenModalButton
											modalComponent={
												<DeleteReviewModal
													reviewId={review.id}
													spotId={spot.id}
												/>
											}
											buttonText="Delete"
										/>
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
