import { useDispatch } from "react-redux";
import { deleteSpotById } from "../../store/spots";
import { useModal } from "../../context/Modal";
import "./CurrentSpotsPage.css";
const DeleteSpotModal = ({ spotId }) => {
	const dispatch = useDispatch();
	const { closeModal } = useModal();
	return (
		<div className="delete-modal">
			<h1>Confirm Delete</h1>
			<p>Are you sure you want to remove this spot from the listings?</p>
			<button
				onClick={() => {
					dispatch(deleteSpotById(spotId)).then(closeModal);
				}}
			>
				Yes (Delete Spot)
			</button>
			<button onClick={closeModal}>No (Keep Spot)</button>
		</div>
	);
};

export default DeleteSpotModal;
