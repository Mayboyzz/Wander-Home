import { IoMdStar } from "react-icons/io";

const SpotDetail = ({ spot }) => {
	if (!spot || !spot.SpotImages) return <p>Loading...</p>;

	const mainImg = spot.SpotImages.find((image) => image.preview === true);
	const otherImages = spot.SpotImages.filter((image) => !image.preview);
	const sortedOtherImages = otherImages.sort((a, b) => a.id - b.id);
	return (
		<>
			<div className="mb-6" data-testid="spot-name">
				<h1 className="text-2xl font-semibold mb-2">{spot.name}</h1>
				<h3 className="text-sm text-gray-700" data-testid="spot-location">
					{spot.city}, {spot.state}, {spot.country}
				</h3>
			</div>

			<div className="grid grid-cols-4 gap-2 mb-12 h-[400px]">
				<img
					className="col-span-2 row-span-2 w-full h-full object-cover rounded-l-xl"
					src={`${mainImg.url}`}
					alt={`Main view of ${spot.name}`}
				/>
				<div className="col-span-2 grid grid-cols-2 gap-2">
					{sortedOtherImages.slice(0, 4).map((image, index) => (
						<img
							key={`img-${image.id}`}
							className={`w-full h-[196px] object-cover ${
								index === 1 ? "rounded-tr-xl" : ""
							} ${index === 3 ? "rounded-br-xl" : ""}`}
							src={`${image.url}`}
							alt={`${spot.name} icon ${image.id}`}
						/>
					))}
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t pt-8">
				<div className="md:col-span-2">
					<h2 className="text-xl font-semibold mb-4">
						Hosted by {spot.Owner.firstName} {spot.Owner.lastName}
					</h2>
					<p className="text-gray-600">{spot.description}</p>
				</div>

				<div className="border rounded-xl p-6 shadow-lg h-fit">
					<div className="flex justify-between items-center mb-4">
						<div className="text-xl font-semibold">
							${spot.price} <span className="text-base font-normal">night</span>
						</div>
						<div className="flex items-center gap-1">
							<IoMdStar className="text-lg" />
							{spot.numReviews === 0 && <span>New</span>}
							{spot.numReviews === 1 && (
								<span>
									{spot.avgStarRating} · {spot.numReviews} Review
								</span>
							)}
							{spot.numReviews > 1 && (
								<span>
									{spot.avgStarRating} · {spot.numReviews} Reviews
								</span>
							)}
						</div>
					</div>
					<button
						type="button"
						onClick={() => alert("Feature Coming Soon...")}
						className="w-full bg-[#FF385C] text-white py-3 rounded-lg font-semibold hover:bg-[#E31C5F] transition-colors"
					>
						Reserve
					</button>
				</div>
			</div>
		</>
	);
};

export default SpotDetail;
