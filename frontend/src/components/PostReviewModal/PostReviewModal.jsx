import { useState } from "react";
import RatingReview from "./RatingReview";
import { createReview } from "../../store/reviews";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
// import { useNavigate } from "react-router-dom";
const PostReviewModal = () => {
	const [rating, setRating] = useState(0);
	const [review, setReview] = useState("");
	const { closeModal } = useModal();
	const spot = useSelector((state) => state.spots.currentSpot);

	// const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		// setErrors({});
		return dispatch(createReview(spot.id, { review, stars: rating })).then(
			closeModal
		);
		// .catch(async (res) => {
		// 	const data = await res.json();
		// 	if (data?.errors) {
		// 		setErrors(data.errors);
		// 	}
		// });
	};

	return (
		<>
			<h1>How was your stay?</h1>
			<form onSubmit={handleSubmit}>
				<textarea
					placeholder="Leave your review here..."
					onChange={(e) => setReview(e.target.value)}
				></textarea>
				<RatingReview rating={rating} setRating={setRating} />

				<button
					// onClick={() => navigate("/spots/" + spot.id)}
					type="submit"
					disabled={review.length < 10}
				>
					Submit Your Review!
				</button>
			</form>
		</>
	);
};

export default PostReviewModal;
