import { useEffect } from "react";
import "./SpotPage.css";
import { IoMdStar } from "react-icons/io";
import { getSpotById } from "../../store/spots";

const SpotDetail = ({ spot }) => {
	useEffect(() => {
		getSpotById(spot.id);
	}, [spot]);

	if (!spot || !spot.SpotImages) return <p>Loading...</p>;

	const mainImg = spot.SpotImages.find((image) => image.preview === true);
	const otherImages = spot.SpotImages.filter((image) => !image.preview);

	return (
		<>
			<h1>{spot.name}</h1>
			<h3>
				{spot.city}, {spot.state}, {spot.country}
			</h3>
			<div className="spot-images">
				<img
					className="big-image"
					src={`${mainImg.url}`}
					alt={`Main view of $${spot.name}`}
				/>
				<div className="small-images">
					{otherImages.map((image) => (
						<img key={`img-${image.id}`} src={`${image.url}`} />
					))}
				</div>
			</div>
			<div className="bottom-spot-detail">
				<div className="spot-description">
					<h2>
						Hosted by {spot.Owner.firstName} {spot.Owner.lastName}
					</h2>
					<p>{spot.description}</p>
				</div>
				<div className="reserve-a-booking">
					<div className="price-reviews">
						<div>${spot.price} / night</div>
						<div className="avgStarRating">
							<IoMdStar />
							{spot.numReviews === 0 && <span>New</span>}
							{spot.numReviews === 1 && (
								<span key="single-review">
									{spot.avgStarRating} - {spot.numReviews} Review
								</span>
							)}
							{spot.numReviews > 1 && (
								<span key="multiple-reviews">
									{spot.avgStarRating} - {spot.numReviews} Reviews
								</span>
							)}
						</div>
					</div>
					<button onClick={() => alert("Feature Coming Soon...")}>
						Reserve
					</button>
				</div>
			</div>
		</>
	);
};

export default SpotDetail;
