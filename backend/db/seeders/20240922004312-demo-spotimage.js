"use strict";
const { SpotImage } = require("../models");
let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		for (let i = 1; i < 5; i++) {
			await SpotImage.bulkCreate([
				{
					spotId: i,
					url: "https://www.bhg.com/thmb/H9VV9JNnKl-H1faFXnPlQfNprYw=/1799x0/filters:no_upscale():strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg",
					preview: true,
				},
				{
					spotId: i,
					url: "https://colleenmcnally.com/wp-content/uploads/2019/06/living-room-and-kitchen-design.jpg",
					preview: false,
				},
				{
					spotId: i,
					url: "https://thearchitecturedesigns.com/wp-content/uploads/2021/06/Decorate-Your-Home-on-a-Budget-6.jpg",
					preview: false,
				},
				{
					spotId: i,
					url: "https://cdn.decorilla.com/online-decorating/wp-content/uploads/2023/06/Bedroom-interior-design-ideas-for-relaxation.jpg?width=900",
					preview: false,
				},
				{
					spotId: i,
					url: "https://media.architecturaldigest.com/photos/64db9eb3be7a08b03e6cd3a0/16:9/w_2580,c_limit/TBHC_50_Bridge_Park_Dr_0900.jpeg",
					preview: false,
				},
			]);
		}
	},

	async down(queryInterface, Sequelize) {
		options.tableName = "SpotImages";
		return queryInterface.bulkDelete(options, null, {});
	},
};
