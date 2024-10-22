import { useEffect, useState } from "react";
import RatingReview from "./RatingReview";
import { createReview, getReviewBySpotId } from "../../store/reviews";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";

const PostReviewModal = ({spotId}) => {
	const [rating, setRating] = useState(0);
	const [review, setReview] = useState("");
	const [button, setButton] = useState(true);

	const { closeModal } = useModal();
	const spot = useSelector((state) => state.spots.currentSpot);
	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(createReview(spot.id, { review, stars: rating })).then(closeModal);
		dispatch(getReviewBySpotId(spotId))
	};

	useEffect(() => {
		if (review.length >= 10 && rating > 0) setButton(false);
	}, [rating, review]);
	return (
		<>
			<h1>How was your stay?</h1>
			<form onSubmit={handleSubmit}>
				<textarea
					placeholder="Leave your review here..."
					onChange={(e) => setReview(e.target.value)}
				></textarea>
				<RatingReview rating={rating} setRating={setRating} />

				<button type="submit" disabled={button}>
					Submit Your Review!
				</button>
			</form>
		</>
	);
};

export default PostReviewModal;
