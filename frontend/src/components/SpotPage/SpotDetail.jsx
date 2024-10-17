import "./SpotPage.css";
import { IoMdStar } from "react-icons/io";

const SpotDetail = ({ spot }) => {
	const mainImg = spot.SpotImages.find((image) => image.preview === true);
	const images = spot.SpotImages;

	return (
		<>
			<h1>{spot.name}</h1>
			<h3>
				{spot.city}, {spot.state}, {spot.country}
			</h3>
			<div className="spot-images">
				<img className="big-image" src={`${mainImg.url}`} />
				<div className="small-images">
					{images.map((image) => {
						if (image.preview === false) {
							return (
								<>
									<img src={`${image.url}`} />
								</>
							);
						}
					})}
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
								<>
									<span>
										{spot.avgStarRating} - {spot.numReviews} Review
									</span>
								</>
							)}
							{spot.numReviews > 1 && (
								<>
									<span>
										{spot.avgStarRating} - {spot.numReviews} Reviews
									</span>
								</>
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
