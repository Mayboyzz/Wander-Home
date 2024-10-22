"use strict";
const { SpotImage } = require("../models");
let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}
const mainImages = [
	"https://cdn.discordapp.com/attachments/350710235272445972/1298094538786734121/DALLE_2024-10-21_20.22.06_-_A_detailed_image_of_the_front_of_a_house_with_a_modern_design._The_house_features_large_glass_windows_a_flat_roof_and_sleek_wooden_panels._The_yard_.webp?ex=6718503f&is=6716febf&hm=cc27cdcc378c4f0200c719860c7337d3d3e9f6d44f7c21ced4ab4bb15e27d652&",
	"https://cdn.discordapp.com/attachments/350710235272445972/1298094539357294723/DALLE_2024-10-21_20.23.22_-_A_detailed_image_of_the_front_of_a_traditional_suburban_house._The_house_features_a_gabled_roof_a_red_brick_exterior_and_white-framed_windows_with_s.webp?ex=6718503f&is=6716febf&hm=2b2138c8c52907aeb24b173973e7b5464d02cdf5aa31dd5197e594869ede0672&",
	"https://cdn.discordapp.com/attachments/350710235272445972/1298094539957075968/DALLE_2024-10-21_20.23.19_-_A_detailed_image_of_the_front_of_a_traditional_suburban_house._The_house_features_a_gabled_roof_a_red_brick_exterior_and_white-framed_windows_with_s.webp?ex=6718503f&is=6716febf&hm=50b2e975420dba98505f855b91e16eb2238194c64c00e0de83ff045b13af4550&",
	"https://cdn.discordapp.com/attachments/350710235272445972/1298094540573507655/DALLE_2024-10-21_20.22.50_-_A_detailed_image_of_the_front_of_a_contemporary_house._The_house_features_a_sloped_roof_large_windows_and_a_combination_of_stone_and_wood_materials_.webp?ex=6718503f&is=6716febf&hm=2af9f563e7dbe173dfceefe4591dc41dba4e9202ad84fb2531632a2a50a34bb0&",
	"https://cdn.discordapp.com/attachments/350710235272445972/1298094541169233981/DALLE_2024-10-21_20.22.46_-_A_detailed_image_of_the_front_of_a_contemporary_house._The_house_features_a_sloped_roof_large_windows_and_a_combination_of_stone_and_wood_materials_.webp?ex=67185040&is=6716fec0&hm=c15ed61d0bdd3e004b52daf1bfc2a2515f641d36f6f782a76806345116fb4b8c&",
	"https://cdn.discordapp.com/attachments/350710235272445972/1298094541693517854/DALLE_2024-10-21_20.22.09_-_A_detailed_image_of_the_front_of_a_house_with_a_modern_design._The_house_features_large_glass_windows_a_flat_roof_and_sleek_wooden_panels._The_yard_.webp?ex=67185040&is=6716fec0&hm=77d7439b80fe274a53def0278f24272cb8fa83ce1654b046d321284264f4df7d&",
];
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		for (let i = 0; i < 6; i++) {
			await SpotImage.bulkCreate([
				{
					spotId: i + 1,
					url: mainImages[i],
					preview: true,
				},
				{
					spotId: i + 1,
					url: "https://colleenmcnally.com/wp-content/uploads/2019/06/living-room-and-kitchen-design.jpg",
					preview: false,
				},
				{
					spotId: i + 1,
					url: "https://thearchitecturedesigns.com/wp-content/uploads/2021/06/Decorate-Your-Home-on-a-Budget-6.jpg",
					preview: false,
				},
				{
					spotId: i + 1,
					url: "https://cdn.decorilla.com/online-decorating/wp-content/uploads/2023/06/Bedroom-interior-design-ideas-for-relaxation.jpg?width=900",
					preview: false,
				},
				{
					spotId: i + 1,
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
