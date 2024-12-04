import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteReviewById } from "../../store/reviews";

const DeleteReviewModal = ({ reviewId, spotId }) => {
	const dispatch = useDispatch();
	const { closeModal } = useModal();

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
			<div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
				<h1 className="text-2xl font-bold mb-4 text-gray-800">
					Confirm Delete
				</h1>
				<p className="text-gray-600 mb-6 text-center">
					Are you sure you want to delete this review?
				</p>
				<div className="flex gap-4 w-full">
					<button
						type="button"
						className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
						onClick={async () => {
							await dispatch(deleteReviewById(reviewId, spotId));
							closeModal();
						}}
					>
						Yes (Delete Review)
					</button>
					<button
						className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
						onClick={closeModal}
						type="button"
					>
						No (Keep Review)
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeleteReviewModal;
