import { useSelector } from "react-redux";
import { IoMdStar } from "react-icons/io";
import OpenModalButton from "../OpenModalButton";
import PostReviewModal from "../PostReviewModal";
import DeleteReviewModal from "./DeleteReviewModal";

const ReviewDetail = ({ spotId }) => {
	const reviews = useSelector((state) => state.reviews.SpotReviews);
	const spot = useSelector((state) => state.spots.currentSpot);
	const sessionUser = useSelector((state) => state.session.user);

	const reviewed = sessionUser
		? reviews.find((review) => review.userId === sessionUser.id)
		: false;

	if (!reviews) return null;

	return (
		<>
			<div className="border-t mt-8 pt-8">
				<div className="flex items-center gap-2 text-xl mb-6">
					<IoMdStar />
					{reviews.length === 0 && <span>New</span>}
					{reviews.length === 1 && (
						<span>
							{spot.avgStarRating} · {reviews.length} Review
						</span>
					)}
					{reviews.length > 1 && (
						<span>
							{spot.avgStarRating} · {reviews.length} Reviews
						</span>
					)}
				</div>
				{sessionUser && spot.ownerId !== sessionUser.id && !reviewed && (
					<OpenModalButton
						buttonText="Post Your Review"
						modalComponent={<PostReviewModal spotId={spotId} />}
						className="bg-[#FF385C] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#E31C5F] transition-colors inline-block"
					/>
				)}

				{sessionUser && reviews.length === 0 && (
					<p className="text-gray-600 mt-4">Be the first to post a review!</p>
				)}

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
					{reviews.toReversed().map((review) => {
						const formatter = new Intl.DateTimeFormat("en-US", {
							year: "numeric",
							month: "long",
						});
						const date = new Date(review.createdAt);
						return (
							<div key={review.id} className="review-box">
								{reviews.length >= 1 && (
									<>
										<h3 className="font-semibold mb-1">
											{review.User?.firstName}
										</h3>
										<span className="text-gray-500 text-sm">
											{formatter.format(date)}
										</span>
										<p className="mt-2 text-gray-700">{review.review}</p>
										{sessionUser && sessionUser.id === review.userId && (
											<div className="mt-4">
												<OpenModalButton
													modalComponent={
														<DeleteReviewModal
															reviewId={review.id}
															spotId={spot.id}
														/>
													}
													buttonText="Delete"
													className="text-sm text-gray-600 underline"
												/>
											</div>
										)}
									</>
								)}
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default ReviewDetail;
