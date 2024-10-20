"use strict";
const { Review } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await Review.bulkCreate([
			{
				userId: 2,
				spotId: 1,
				review: "This was an awesome spot!",
				stars: 5,
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		options.tableName = "Reviews";
		return queryInterface.bulkDelete(options, null, {});
	},
};
