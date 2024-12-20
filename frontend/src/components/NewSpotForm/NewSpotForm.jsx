import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
	addImageToSpot,
	createSpot,
	getAllSpots,
	loadOneSpot,
} from "../../store/spots";
import { useNavigate } from "react-router-dom";

const NewSpotForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [country, setCountry] = useState("");
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [lat, setLat] = useState(0);
	const [lng, setLng] = useState(0);
	const [description, setDescription] = useState("");
	const [name, setName] = useState("");
	const [price, setPrice] = useState(0);

	const [previewImg, setPreviewImg] = useState("");
	const [image1, setImage1] = useState(
		"https://www.distefanosales.com/wp-content/uploads/2023/08/image-coming-soon-placeholder.png",
	);
	const [image2, setImage2] = useState(
		"https://www.distefanosales.com/wp-content/uploads/2023/08/image-coming-soon-placeholder.png",
	);
	const [image3, setImage3] = useState(
		"https://www.distefanosales.com/wp-content/uploads/2023/08/image-coming-soon-placeholder.png",
	);
	const [image4, setImage4] = useState(
		"https://www.distefanosales.com/wp-content/uploads/2023/08/image-coming-soon-placeholder.png",
	);

	const [errors, setErrors] = useState({});

	const validExtensions = [".jpg", ".png", ".jpeg"];
	useEffect(() => {
		dispatch(getAllSpots());
	}, [dispatch]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const errors = {};
		if (!country.length) errors.country = "Country is required";
		if (!address.length) errors.address = "Address is required";
		if (!city.length) errors.city = "City is required";
		if (!state.length) errors.state = "State is required";
		if (!lat) errors.lat = "Latitude is required";
		if (!lng) errors.lng = "Longitude is required";
		if (description.length < 30)
			errors.description = "Description needs a minimum of 30 characters";
		if (!name.length) errors.name = "Name is required";
		if (!price) errors.price = "Price is required";

		if (!previewImg) errors.previewImg = "Preview image is required";
		if (!validExtensions.some((extension) => image1.endsWith(extension)))
			errors.image1 = "Image URL must end in .png, .jpg, .jpeg";
		if (!validExtensions.some((extension) => image2.endsWith(extension)))
			errors.image2 = "Image URL must end in .png, .jpg, .jpeg";
		if (!validExtensions.some((extension) => image3.endsWith(extension)))
			errors.image3 = "Image URL must end in .png, .jpg, .jpeg";
		if (!validExtensions.some((extension) => image4.endsWith(extension)))
			errors.image4 = "Image URL must end in .png, .jpg, .jpeg";

		const newSpot = {
			country,
			address,
			city,
			state,
			lat,
			lng,
			description,
			name,
			price,
		};

		const images = [image1, image2, image3, image4];

		if (Object.keys(errors).length) {
			setErrors(errors);
			return;
		}

		const createdSpot = await dispatch(createSpot(newSpot));

		await dispatch(
			addImageToSpot(createdSpot.id, { preview: true, url: previewImg }),
		);

		for (const image of images) {
			await dispatch(
				addImageToSpot(createdSpot.id, { preview: false, url: image }),
			);
		}

		if (createdSpot) {
			navigate(`/spots/${createdSpot.id}`);
			loadOneSpot(null);
		}
		reset();
	};

	const reset = () => {
		setAddress("");
		setCity("");
		setCountry("");
		setDescription("");
		setLat(0);
		setLng(0);
		setName("");
		setPrice(0);
		setState("");
	};

	return (
		<div className="max-w-3xl mx-auto px-4 py-8">
			<section className="bg-white rounded-lg shadow-md p-6 space-y-6">
				<div className="space-y-2">
					<h1 className="text-3xl font-bold text-gray-800">
						Create a new Spot
					</h1>
					<h3 className="text-xl font-semibold text-gray-700">
						Where&apos;s your place located?
					</h3>
					<span className="text-gray-600 text-sm">
						Guests will only get your exact address once they booked a
						reservation.
					</span>
				</div>

				<form className="space-y-4" onSubmit={handleSubmit}>
					<div className="space-y-1">
						{errors.country && (
							<p className="text-red-500 text-sm">* {errors.country}</p>
						)}
						<input
							type="text"
							placeholder="Country"
							value={country}
							onChange={(e) => setCountry(e.target.value)}
							className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
						/>
					</div>

					<div className="space-y-1">
						{errors.address && (
							<p className="text-red-500 text-sm">* {errors.address}</p>
						)}
						<input
							type="text"
							placeholder="Address"
							value={address}
							onChange={(e) => setAddress(e.target.value)}
							className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
						/>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-1">
							{errors.city && (
								<p className="text-red-500 text-sm">* {errors.city}</p>
							)}
							<input
								type="text"
								placeholder="City"
								value={city}
								onChange={(e) => setCity(e.target.value)}
								className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
							/>
						</div>

						<div className="space-y-1">
							{errors.state && (
								<p className="text-red-500 text-sm">* {errors.state}</p>
							)}
							<input
								type="text"
								placeholder="State"
								value={state}
								onChange={(e) => setState(e.target.value)}
								className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
							/>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-1">
							{errors.lat && (
								<p className="text-red-500 text-sm">* {errors.lat}</p>
							)}
							<input
								type="number"
								placeholder="Latitude"
								onChange={(e) => setLat(e.target.value)}
								className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
							/>
						</div>

						<div className="space-y-1">
							{errors.lng && (
								<p className="text-red-500 text-sm">* {errors.lng}</p>
							)}
							<input
								type="number"
								placeholder="Longitude"
								onChange={(e) => setLng(e.target.value)}
								className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
							/>
						</div>
					</div>

					<div className="space-y-2 pt-4">
						<h3 className="text-xl font-semibold text-gray-700">
							Describe your place to guests
						</h3>
						<span className="text-gray-600 text-sm">
							Mention the best features of your space, any special amenities
							like fast wifi or parking, and what you love about the
							neighborhood.
						</span>
						{errors.description && (
							<p className="text-red-500 text-sm">* {errors.description}</p>
						)}
						<textarea
							className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none min-h-[120px]"
							placeholder="Please write at least 30 characters"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>

					<div className="space-y-2 pt-4">
						<h3 className="text-xl font-semibold text-gray-700">
							Create a title for your spot
						</h3>
						<span className="text-gray-600 text-sm">
							Catch guests&apos; attention with a spot title that highlights
							what makes your place special.
						</span>
						{errors.name && (
							<p className="text-red-500 text-sm">* {errors.name}</p>
						)}
						<input
							type="text"
							placeholder="Name of your spot"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
						/>
					</div>

					<div className="space-y-2 pt-4">
						<h3 className="text-xl font-semibold text-gray-700">
							Set a base price for your spot
						</h3>
						<span className="text-gray-600 text-sm">
							Competitive pricing can help your listing stand out and rank
							higher in search results.
						</span>
						{errors.price && (
							<p className="text-red-500 text-sm">* {errors.price}</p>
						)}
						<input
							type="number"
							placeholder="Price per night (USD)"
							onChange={(e) => setPrice(e.target.value)}
							className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
						/>
					</div>

					<div className="space-y-2 pt-4">
						<h3 className="text-xl font-semibold text-gray-700">
							Liven up your spot with photos
						</h3>
						<span className="text-gray-600 text-sm">
							Submit a link to at least one photo to publish your spot.
						</span>

						<div className="space-y-4">
							<div className="space-y-1">
								{errors.previewImg && (
									<p className="text-red-500 text-sm">* {errors.previewImg}</p>
								)}
								<input
									type="text"
									placeholder="Preview Image URL"
									onChange={(e) => setPreviewImg(e.target.value)}
									className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
								/>
							</div>

							{[
								{ error: errors.image1, setter: setImage1 },
								{ error: errors.image2, setter: setImage2 },
								{ error: errors.image3, setter: setImage3 },
								{ error: errors.image4, setter: setImage4 },
							].map((image, idx) => (
								<div key={`additional-image-${idx + 1}`} className="space-y-1">
									{image.error && (
										<p className="text-red-500 text-sm">* {image.error}</p>
									)}
									<input
										type="text"
										placeholder="Image URL"
										onChange={(e) => image.setter(e.target.value)}
										className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
									/>
								</div>
							))}
						</div>
					</div>

					<button
						type="submit"
						className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-semibold mt-6"
					>
						Create Spot
					</button>
				</form>
			</section>
		</div>
	);
};

export default NewSpotForm;
