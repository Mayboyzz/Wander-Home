import { useDispatch } from "react-redux";
import { deleteSpotById } from "../../store/spots";
import { useModal } from "../../context/Modal";

const DeleteSpotModal = ({ spotId }) => {
	const dispatch = useDispatch();
	const { closeModal } = useModal();
	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold text-center">Confirm Delete</h1>
			<p className="text-neutral-500 text-center">
				Are you sure you want to remove this spot from the listings?
			</p>
			<button
				type="button"
				className="bg-rausch text-white px-4 py-2 rounded-lg hover:bg-hackberry transition-colors w-full mt-2"
				onClick={() => {
					dispatch(deleteSpotById(spotId)).then(closeModal);
				}}
			>
				Yes (Delete Spot)
			</button>
			<button
				type="button"
				className="text-neutral-50 px-4 py-2 rounded-lg hover:bg-neutral-800 transition-colors w-full mt-2 bg-foggy"
				onClick={closeModal}
			>
				No (Keep Spot)
			</button>
		</div>
	);
};

export default DeleteSpotModal;
