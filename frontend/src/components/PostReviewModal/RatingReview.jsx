const RatingReview = ({ rating, setRating }) => {
	return (
		<>
			<div>
				{[1, 2, 3, 4, 5].map((star) => {
					return (
						<span
							key={`key-${star}`}
							className="start"
							style={{
								cursor: "pointer",
								color: rating >= star ? "gold" : "gray",
								fontSize: `35px`,
							}}
							onClick={() => {
								setRating(star);
							}}
						>
							{" "}
							★{" "}
						</span>
					);
				})}
			</div>
		</>
	);
};

export default RatingReview;
