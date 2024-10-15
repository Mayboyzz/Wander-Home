import "./SpotPage.css";
import { IoMdStar } from "react-icons/io";
const SpotDetail = ({ spot }) => {
	const mainImg = spot.SpotImages.find((image) => image.preview === true);
	return (
		<>
			<h1>{spot.name}</h1>
			<h3>
				{spot.city}, {spot.state}, {spot.country}
			</h3>
			<div className="spot-images">
				<img className="big-image" src="/pexels-binyaminmellish-1396122.jpg" />
				<div className="small-images">
					<img src="/pexels-binyaminmellish-1396122.jpg" />
					<img src="/pexels-binyaminmellish-1396122.jpg" />
					<img src="/pexels-binyaminmellish-1396122.jpg" />
					<img src="/pexels-binyaminmellish-1396122.jpg" />
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
							<span>
								{spot.avgStarRating ? spot.avgStarRating : 0} -{" "}
								{spot.numReviews} reviews
							</span>
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
