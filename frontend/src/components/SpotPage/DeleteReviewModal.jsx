import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteReviewById, getReviewBySpotId } from "../../store/reviews";

const DeleteReviewModal = ({ reviewId, spotId }) => {
	const dispatch = useDispatch();
	const { closeModal } = useModal();
	return (
		<div className="review-delete-modal">
			<h1>Confirm Delete</h1>
			<p>Are you sure you want to delete this review?</p>
			<button
				onClick={() => {
					dispatch(deleteReviewById(reviewId)).then(closeModal);
					dispatch(getReviewBySpotId(spotId));
				}}
			>
				Yes (Delete Review)
			</button>
			<button onClick={closeModal}>No (Keep Review)</button>
		</div>
	);
};

export default DeleteReviewModal;
