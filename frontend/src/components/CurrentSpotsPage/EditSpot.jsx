import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getSpotById, updateSpot } from "../../store/spots";

const EditSpot = () => {
	const { spotId } = useParams();

	const spot = useSelector((state) => state.spots.currentSpot);

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

	const [errors, setErrors] = useState({});

	useEffect(() => {
		if (spotId) {
			dispatch(getSpotById(spotId));
		}
	}, [dispatch, spotId]);

	useEffect(() => {
		if (spot) {
			setCountry(spot.country || "");
			setAddress(spot.address || "");
			setCity(spot.city || "");
			setState(spot.state || "");
			setLat(spot.lat || 0);
			setLng(spot.lng || 0);
			setDescription(spot.description || "");
			setName(spot.name || "");
			setPrice(spot.price || 0);
		}
	}, [spot]);

	if (!spot) return null;

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

		if (Object.keys(errors).length > 0) {
			setErrors(errors);
			return;
		}

		const updatedSpot = {
			...spot,
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

		dispatch(updateSpot(spotId, updatedSpot));

		navigate(`/spots/${spotId}`);
	};

	return (
		<div key="update-spot-form">
			<section className="create-spot-form-wrapper">
				<div className="form-header">
					<h1>Update Spot</h1>
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
							type="text"
							placeholder="Latitude"
							value={lat}
							onChange={(e) => setLat(e.target.value)}
						/>

						<input
							type="text"
							placeholder="Longitude"
							value={lng}
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
						type="text"
						placeholder="Price per night (USD)"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
					/>

					<button type="submit">Update Spot</button>
				</form>
			</section>
		</div>
	);
};

export default EditSpot;
