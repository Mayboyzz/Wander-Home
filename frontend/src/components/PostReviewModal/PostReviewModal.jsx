import { useEffect, useState } from "react";
import RatingReview from "./RatingReview";
import { createReview } from "../../store/reviews";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { getSpotById } from "../../store/spots";

const PostReviewModal = ({ spotId }) => {
	const [rating, setRating] = useState(0);
	const [review, setReview] = useState("");
	const [button, setButton] = useState(true);

	const { closeModal } = useModal();
	const spot = useSelector((state) => state.spots.currentSpot);
	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await dispatch(createReview(spot.id, { review, stars: rating }));
		await dispatch(getSpotById(spotId));
		closeModal();
	};

	useEffect(() => {
		if (review.length >= 10 && rating > 0) setButton(false);
	}, [rating, review]);

	return (
		<div
			className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
						p-6 w-[450px] flex flex-col items-center bg-white rounded-lg"
		>
			<h1 className="text-2xl font-bold mb-6 text-gray-800">
				How was your stay?
			</h1>
			<form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
				<textarea
					placeholder="Leave your review here..."
					onChange={(e) => setReview(e.target.value)}
					className="w-full min-h-[120px] p-3 border border-gray-300 rounded-md
							 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent
							 resize-none text-gray-700"
				/>
				<RatingReview rating={rating} setRating={setRating} />

				<button
					type="submit"
					disabled={button}
					className={`mt-4 py-2 px-4 rounded-lg font-semibold text-white
							  ${
									button
										? "bg-gray-400 cursor-not-allowed"
										: "bg-teal-600 hover:bg-teal-700 transition-colors"
								}`}
				>
					Submit Your Review!
				</button>
			</form>
		</div>
	);
};

export default PostReviewModal;
