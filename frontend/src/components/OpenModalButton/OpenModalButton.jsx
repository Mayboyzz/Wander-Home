import { useModal } from "../../context/Modal";

export default function OpenModalButton({
	modalComponent, // component to render inside the modal
	buttonText, // text of the button that opens the modal
	onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
	onModalClose, // optional: callback function that will be called once the modal is closed
	className, // new prop for custom styling
}) {
	const { setModalContent, setOnModalClose } = useModal();

	const onClick = () => {
		if (onModalClose) setOnModalClose(onModalClose);
		setModalContent(modalComponent);
		if (typeof onButtonClick === "function") onButtonClick();
	};

	return (
		<button
			type="button"
			onClick={onClick}
			className={
				className ||
				"bg-rausch text-white px-4 py-1 rounded-lg hover:bg-hackberry transition-colors text-sm w-full"
			}
		>
			{buttonText}
		</button>
	);
}
