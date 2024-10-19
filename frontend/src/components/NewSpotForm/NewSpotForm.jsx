import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addImageToSpot, createSpot, getAllSpots } from "../../store/spots";
import { useNavigate } from "react-router-dom";
import "./NewSpotForm.css";

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
		"https://www.distefanosales.com/wp-content/uploads/2023/08/image-coming-soon-placeholder.png"
	);
	const [image2, setImage2] = useState(
		"https://www.distefanosales.com/wp-content/uploads/2023/08/image-coming-soon-placeholder.png"
	);
	const [image3, setImage3] = useState(
		"https://www.distefanosales.com/wp-content/uploads/2023/08/image-coming-soon-placeholder.png"
	);
	const [image4, setImage4] = useState(
		"https://www.distefanosales.com/wp-content/uploads/2023/08/image-coming-soon-placeholder.png"
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
			addImageToSpot(createdSpot.id, { preview: true, url: previewImg })
		);
		images.forEach((image) =>
			dispatch(addImageToSpot(createdSpot.id, { preview: false, url: image }))
		);

		if (createdSpot) {
			navigate(`/spots/${createdSpot.id}`);
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
		<>
			<section className="create-spot-form-wrapper">
				<div className="form-header">
					<h1>Create a new Spot</h1>
					<h3>Where&apos;s your place located?</h3>
					<span>
						Guests will only get your exact address once they booked a
						reservation.
					</span>
				</div>

				<form className="create-spot-form" onSubmit={handleSubmit}>
					{errors.country && (
						<p className="error-message">* {errors.country}</p>
					)}
					<input
						type="text"
						placeholder="Country"
						value={country}
						onChange={(e) => setCountry(e.target.value)}
					/>
					{errors.address && (
						<p className="error-message">* {errors.address}</p>
					)}
					<input
						type="text"
						placeholder="Address"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
					/>
					<div className="city-state-errors">
						{errors.city && <p className="error-message">* {errors.city}</p>}
						{errors.state && (
							<p className="error-message-right">* {errors.state}</p>
						)}
					</div>

					<div className="city-state">
						<input
							type="text"
							placeholder="City"
							value={city}
							onChange={(e) => setCity(e.target.value)}
						/>

						<input
							type="text"
							placeholder="State"
							value={state}
							onChange={(e) => setState(e.target.value)}
						/>
					</div>
					<div className="city-state-errors">
						{errors.lat && <p className="error-message">* {errors.lat}</p>}
						{errors.lng && (
							<p className="error-message-right">* {errors.lng}</p>
						)}
					</div>
					<div className="lat-lng">
						<input
							type="number"
							placeholder="Latitude"
							onChange={(e) => setLat(e.target.value)}
						/>

						<input
							type="number"
							placeholder="Longitude"
							onChange={(e) => setLng(e.target.value)}
						/>
					</div>
					<div className="form-header">
						<h3>Describe your place to guests</h3>
						<span>
							Mention the best features of your space, any special amentities
							like fast wifi or parking, and what you love about the
							neighborhood.
						</span>
					</div>
					{errors.description && (
						<p className="error-message">* {errors.description}</p>
					)}
					<textarea
						className="create-spot-description"
						name="description"
						placeholder="Please write at least 30 characters"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
					<div className="form-header">
						<h3>Create a title for your spot</h3>
						<span>
							Catch guests&apos; attention with a spot title that highlights
							what makes your place special.
						</span>
					</div>
					{errors.name && <p className="error-message">* {errors.name}</p>}
					<input
						type="text"
						placeholder="Name of your spot"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<div className="form-header">
						<h3>Set a base price for your spot</h3>
						<span>
							Competitive pricing can help your listing stand out and rank
							higher in search results.
						</span>
					</div>
					{errors.price && <p className="error-message">* {errors.price}</p>}
					<input
						type="number"
						placeholder="Price per night (USD)"
						onChange={(e) => setPrice(e.target.value)}
					/>
					<div className="form-header">
						<h3>Liven up your spot with photos</h3>
						<span>
							Submit a link to at least one photo to publish your spot.
						</span>
					</div>

					{errors.previewImg && (
						<p className="error-message">* {errors.previewImg}</p>
					)}
					<input
						type="text"
						placeholder="Preview Image URL"
						onChange={(e) => setPreviewImg(e.target.value)}
					/>
					{errors.image1 && <p className="error-message">* {errors.image1}</p>}
					<input
						type="text"
						placeholder="Image URL"
						onChange={(e) => setImage1(e.target.value)}
					/>
					{errors.image2 && <p className="error-message">* {errors.image2}</p>}
					<input
						type="text"
						placeholder="Image URL"
						onChange={(e) => setImage2(e.target.value)}
					/>
					{errors.image3 && <p className="error-message">* {errors.image3}</p>}
					<input
						type="text"
						placeholder="Image URL"
						onChange={(e) => setImage3(e.target.value)}
					/>
					{errors.image4 && <p className="error-message">* {errors.image4}</p>}
					<input
						type="text"
						placeholder="Image URL"
						onChange={(e) => setImage4(e.target.value)}
					/>
					<button type="submit">Create Spot</button>
				</form>
			</section>
		</>
	);
};

export default NewSpotForm;
