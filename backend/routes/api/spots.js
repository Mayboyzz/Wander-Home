const express = require("express");
const {
	Spot,
	User,
	SpotImage,
	Review,
	ReviewImage,
	Sequelize,
	Booking,
} = require("../../db/models");
const router = express.Router();
const { Op } = require("sequelize");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { DATE, Model, where } = require("sequelize");

const validateCreation = [
	check("address")
		.exists({ checkFalsy: true })
		.withMessage("Street address is required"),
	check("city").exists({ checkFalsy: true }).withMessage("City is required"),
	check("state").exists({ checkFalsy: true }).withMessage("State is required"),
	check("country")
		.exists({ checkFalsy: true })
		.withMessage("Country is required"),
	check("lat")
		.exists({ checkFalsy: true })
		.isFloat({ min: -90, max: 90 })
		.withMessage("Latitude must be within -90 and 90"),
	check("lng")
		.exists({ checkFalsy: true })
		.isFloat({ min: -180, max: 180 })
		.withMessage("Longitude must be within -180 and 180"),
	check("name")
		.exists({ checkFalsy: true })
		.isLength({ max: 50 })
		.withMessage("Name must be less than 50 characters"),
	check("description")
		.exists({ checkFalsy: true })
		.withMessage("Description is required"),
	check("price")
		.exists({ checkFalsy: true })
		.custom((value) => (value >= 0 ? true : false))
		.withMessage("Price per day must be a positive number"),
	handleValidationErrors,
];

const validateReview = [
	check("review")
		.exists({ checkFalsy: true })
		.withMessage("Review text is required"),
	check("stars")
		.exists({ checkFalsy: true })
		.isFloat({ min: 1, max: 5 })
		.withMessage("Stars must be an integer from 1 to 5"),
	handleValidationErrors,
];

// Get all Spots
router.get("/", async (req, res) => {
	const spots = await Spot.findAll({
		include: [{ model: SpotImage }, { model: Review }],
	});

	// Mutate Spots object to add Avg Rating, previewImage
	let Spots = [];
	spots.forEach((spot) => {
		Spots.push(spot.toJSON());
	});

	Spots.forEach((spot) => {
		// Grab all reviews
		if (spot.Reviews.length) {
			let count = 0;
			// Iterate through reviews to find star count
			spot.Reviews.forEach((review) => {
				count += review.stars;
			});
			spot.avgRating = count / spot.Reviews.length;
		} else {
			spot.avgRating = 0;
		}
		if (spot.SpotImages.length) {
			spot.SpotImages.forEach((image) => {
				if (image.preview === true) {
					spot.previewImage = image.url;
				}
			});
		} else {
			spot.previewImage = "no preview url";
		}
		delete spot.SpotImages;
		delete spot.Reviews;
	});

	res.json({ Spots });
});
// Get all Spots owned by the Current User
router.get("/current", async (req, res) => {
	const { user } = req;

	if (user) {
		const spots = await Spot.findAll({
			where: { ownerId: user.id },
			include: [{ model: SpotImage }, { model: Review }],
		});

		// Array we will be putting all the resolved promises in
		let Spots = [];
		// Iterate through spots, convert to POJO
		spots.forEach((spot) => {
			Spots.push(spot.toJSON());
		});

		Spots.forEach((spot) => {
			// Grab all reviews
			if (spot.Reviews.length) {
				let count = 0;
				// Iterate through reviews to find star count
				spot.Reviews.forEach((review) => {
					count += review.stars;
				});
				spot.avgRating = count / spot.Reviews.length;
			} else {
				spot.avgRating = 0;
			}
			if (spot.SpotImages.length) {
				spot.SpotImages.forEach((image) => {
					if (image.preview === true) {
						spot.previewImage = image.url;
					}
				});
			} else {
				spot.previewImage = "no preview url";
			}
			delete spot.SpotImages;
			delete spot.Reviews;
		});
		res.json({ Spots });
	} else {
		res.status(401).json({ message: "Authentication required" });
	}
});
// Get details of a spot by SpotId
router.get("/:spotId", async (req, res) => {
	const spot = await Spot.findByPk(req.params.spotId, {
		attributes: {
			include: [
				[Sequelize.fn("COUNT", Sequelize.col("Reviews.id")), "numReviews"],
				[Sequelize.fn("AVG", Sequelize.col("Reviews.stars")), "avgStarRating"],
			],
		},
		include: [
			{ model: Review, attributes: [] },
			{ model: SpotImage, attributes: ["id", "url", "preview"] },
			{ model: User, as: "Owner", attributes: ["id", "firstName", "lastName"] },
		],
	});

	if (spot) {
		res.json(spot);
	} else {
		res.status(404).json({ message: "Spot couldn't be found" });
	}
});
// Create a Spot
router.post("/", validateCreation, async (req, res) => {
	const { user } = req;
	const { address, city, state, country, lat, lng, name, description, price } =
		req.body;
	if (user) {
		const newSpot = await Spot.create({
			ownerId: user.id,
			address,
			city,
			state,
			country,
			lat,
			lng,
			name,
			description,
			price,
		});
		res.status(201).json(newSpot);
	} else {
		res.status(401).json({ message: "Authentication required" });
	}
});

// Add an Image to a spot based on the spot's ID
router.post("/:spotId/images", async (req, res) => {
	const { user } = req;
	if (user) {
		const { url, preview } = req.body;
		const spot = await Spot.findByPk(req.params.spotId);
		if (spot) {
			if (spot.ownerId === user.id) {
				const newImage = await SpotImage.create({
					spotId: spot.id,
					url,
					preview,
				});
				res.status(201).json({
					id: newImage.id,
					url: newImage.url,
					preview: newImage.preview,
				});
			} else {
				res.status(403).json({ message: "Forbidden" });
			}
		} else {
			res.status(404).json({ message: "Spot couldn't be found" });
		}
	} else {
		res.status(401).json({ message: "Authentication required" });
	}
});

// Edit a spot
router.put("/:spotId", validateCreation, async (req, res) => {
	const { user } = req;
	const { address, city, state, country, lat, lng, name, description, price } =
		req.body;
	if (user) {
		const spot = await Spot.findByPk(req.params.spotId);
		if (spot) {
			if (spot.ownerId === user.id) {
				const updatedSpot = await spot.update({
					address: address,
					city: city,
					state: state,
					country: country,
					lat: lat,
					lng: lng,
					name: name,
					description: description,
					price: price,
					updatedAt: new DATE(),
				});
				res.json(updatedSpot);
			} else {
				res.status(403).json({ message: "Forbidden" });
			}
		} else {
			res.status(404).json({ message: "Spot couldn't be found" });
		}
	} else {
		res.status(401).json({ message: "Authentication required" });
	}
});

// Delete a spot
router.delete("/:spotId", async (req, res) => {
	const { user } = req;
	if (user) {
		const spot = await Spot.findByPk(req.params.spotId);
		if (spot) {
			if (user.id === spot.ownerId) {
				await spot.destroy();
				res.status(200).json({ message: "Successfully deleted" });
			} else {
				res.status(403).json({ message: "Forbidden" });
			}
		} else {
			res.status(404).json({ message: "Spot couldn't be found" });
		}
	} else {
		res.status(401).json({ message: "Authentication required" });
	}
});

// Create a review for a spot based on the spot's id
router.post("/:spotId/reviews", validateReview, async (req, res) => {
	const { user } = req;
	const { review, stars } = req.body;

	if (user) {
		const spot = await Spot.findByPk(req.params.spotId);
		if (spot) {
			const reviews = await Review.findOne({
				where: { spotId: spot.id, userId: user.id },
			});
			if (reviews) {
				res
					.status(500)
					.json({ message: "User already has a review for this spot" });
			} else {
				const newReview = await Review.create({
					userId: user.id,
					spotId: spot.id,
					review,
					stars,
				});
				res.status(201).json(newReview);
			}
		} else {
			res.status(404).json({ message: "Spot couldn't be found" });
		}
	}
});

// Get all Reviews by a spot's Id
router.get("/:spotId/reviews", async (req, res) => {
	const spot = await Spot.findByPk(req.params.spotId);
	const reviews = await Review.findAll({
		where: { spotId: req.params.spotId },
		include: [
			{ model: User, attributes: ["id", "firstName", "lastName"] },
			{ model: ReviewImage, attributes: ["id", "url"] },
		],
	});
	if (spot) {
		res.json({ reviews });
	} else {
		res.status(404).json({ message: "Spot couldn't be found" });
	}
});

//Get all Bookings for a Spot based on the Spot's id
router.get("/:spotId/bookings", async (req, res) => {
	const { user } = req;

	if (user) {
		const spot = await Spot.findByPk(req.params.spotId);
		if (spot) {
			if (spot.ownerId === user.id) {
				const booking = await Booking.findAll({
					where: { spotId: spot.id },
					include: { model: User, attributes: ["id", "firstName", "lastName"] },
				});

				const Bookings = booking.map((value) => {
					const startDate = value.startDate;
					const endDate = value.endDate;
					return {
						User: {
							id: value.User.id,
							firstName: value.User.firstName,
							lastName: value.User.lastName,
						},
						id: value.id,
						spotId: spot.id,
						userId: value.userId,
						startDate: `${startDate.getFullYear()}-${
							startDate.getMonth() + 1
						}-${startDate.getDate()}`,
						endDate: `${endDate.getFullYear()}-${
							endDate.getMonth() + 1
						}-${endDate.getDate()}`,
						createdAt: `${value.createdAt.getFullYear()}-${
							value.createdAt.getMonth() + 1
						}-${value.createdAt.getDate()}`,
						updatedAt: `${value.updatedAt.getFullYear()}-${
							value.updatedAt.getMonth() + 1
						}-${value.updatedAt.getDate()}`,
					};
				});
				res.json({ Bookings });
			} else {
				const booking = await Booking.findAll({
					where: { spotId: spot.id },
					attributes: ["spotId", "startDate", "endDate"],
				});
				const Bookings = booking.map((value) => {
					const startDate = value.startDate;
					const endDate = value.endDate;
					console.log(startDate);
					return {
						spotId: spot.id,
						startDate: `${startDate.getFullYear()}-${
							startDate.getMonth() + 1
						}-${startDate.getDate()}`,
						endDate: `${endDate.getFullYear()}-${
							endDate.getMonth() + 1
						}-${endDate.getDate()}`,
					};
				});
				res.json({ Bookings });
			}
		} else {
			res.status(404).json({ message: "Spot couldn't be found" });
		}
	} else {
		res.status(401).json({ message: "Authentication required" });
	}
});

// Create a Booking from a Spot based on the Spot's id
router.post("/:spotId/bookings", async (req, res) => {
	const { user } = req;
	const { startDate, endDate } = req.body;
	const spot = await Spot.findByPk(req.params.spotId);

	if (!spot) {
		return res.status(404).json({ message: "Spot couldn't be found" });
	}

	// Check if the spot belongs to the current user
	if (spot.ownerId === user.id) {
		return res.status(403).json({
			message: "You cannot book your own spot",
		});
	}

	// Check for date conflicts with existing bookings for this spot
	const conflictingBookings = await Booking.findOne({
		where: {
			spotId: spot.id,
			[Op.or]: [
				{
					startDate: { [Op.lte]: endDate },
					endDate: { [Op.gte]: startDate },
				},
			],
		},
	});

	if (conflictingBookings) {
		return res.status(403).json({
			message: "Sorry, this spot is already booked for the specified dates",
			errors: {
				startDate: "Start date conflicts with an existing booking",
				endDate: "End date conflicts with an existing booking",
			},
		});
	}

	const currentDate = new Date();
	if (new Date(startDate) < currentDate) {
		return res.status(400).json({
			message: "Bad Request",
			errors: {
				startDate: "startDate cannot be in the past",
			},
		});
	}

	if (new Date(endDate) <= new Date(startDate)) {
		return res.status(400).json({
			message: "Bad Request",
			errors: {
				endDate: "endDate cannot be on or before startDate",
			},
		});
	}

	const newBooking = await Booking.create({
		spotId: spot.id,
		userId: user.id,
		startDate,
		endDate,
	});
	res.status(201).json(newBooking);
});

module.exports = router;
