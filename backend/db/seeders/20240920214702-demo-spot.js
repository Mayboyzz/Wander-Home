"use strict";

const { Spot } = require("../models");
let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await Spot.bulkCreate([
			{
				ownerId: 1,
				address: "65 Bay Meadows Ave",
				city: "Mason",
				state: "OH",
				country: "United States of America",
				lat: 37.7645358,
				lng: -122.4730327,
				name: "Sunset Haven",
				description:
					"Nestled in Williamsburg, this industrial-chic loft blends urban living with relaxation. With exposed brick, high ceilings, and modern decor, it's steps from Brooklyn’s top cafes, bars, and galleries.",
				price: 123,
			},
			{
				ownerId: 1,
				address: "808 Lexington Avenue",
				city: "Sandusky",
				state: "OH",
				country: "United States of America",
				lat: 37.7645358,
				lng: -122.4730327,
				name: "Urban Oasis Loft",
				description:
					"Nestled in the heart of Williamsburg, this industrial-chic loft provides the perfect blend of urban living and serene relaxation.",
				price: 123,
			},
			{
				ownerId: 1,
				address: "88 Berkshire Ave",
				city: "Hummelstown",
				state: "PA",
				country: "United States of America",
				lat: 37.7645358,
				lng: -122.4730327,
				name: "Forest Retreat Cabin",
				description:
					"Escape to nature in this charming log cabin tucked away in the Blue Ridge Mountains. Forest Retreat Cabin offers all the comforts of home with a rustic twist—think a roaring fireplace, cozy wooden interiors, and a spacious deck that overlooks the forest.",
				price: 123,
			},
			{
				ownerId: 1,
				address: "82 Westport Ave",
				city: "Murfreesboro",
				state: "TN",
				country: "United States of America",
				lat: 37.7645358,
				lng: -122.4730327,
				name: "Mountain Chalet Escape",
				description:
					"This luxurious mountain chalet is the ideal retreat for both summer and winter getaways. With its spacious, ski-in/ski-out design, Mountain Chalet Escape is equipped with a stone fireplace, vaulted ceilings, and a private hot tub that overlooks the snowy peaks.",
				price: 123,
			},
			{
				ownerId: 1,
				address: "250 E. Hickory Ave",
				city: "Fuquay Varina",
				state: "NC",
				country: "United States of America",
				lat: 37.7645358,
				lng: -122.4730327,
				name: "The Glasshouse",
				description:
					"This architectural marvel is a modern desert gem. With glass walls that bring the stunning red rock views inside, The Glasshouse offers an open, airy space filled with natural light.",
				price: 123,
			},
			{
				ownerId: 1,
				address: "44 N. Warren St",
				city: "Onalaska",
				state: "WI",
				country: "United States of America",
				lat: 37.7645358,
				lng: -122.4730327,
				name: "Villa de la Luna",
				description:
					"Experience boho luxury in this eco-friendly villa nestled in the lush jungles of Tulum. Villa de la Luna is a tranquil retreat featuring natural materials, an open-concept design, and a private plunge pool.",
				price: 123,
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		options.tableName = "Spots";
		return queryInterface.bulkDelete(options, null, {});
	},
};
