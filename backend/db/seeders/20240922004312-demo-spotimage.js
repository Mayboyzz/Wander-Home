const { SpotImage } = require("../models");
const options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}
const mainImages = [
	"https://res.cloudinary.com/perryhomes/image/upload/v1706913514/PerryHomes/Blog/Breathtaking%20Front%20of%20House%20D%C3%A9cor%20Ideas/ph.com_blog_2022_may_frontyard_design_ideas.jpg",
	"https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2021/10/1/0/UFYY105_Home-exterior-walkway-mailbox.jpg.rend.hgtvcom.1280.960.suffix/1633368874539.jpeg",
	"https://res.cloudinary.com/brickandbatten/images/f_auto,q_auto/v1641002858/wordpress_assets/beautiful-front-porch-scaled/beautiful-front-porch-scaled.jpg?_i=AA",
	"https://res.cloudinary.com/brickandbatten/image/upload/c_scale,w_464,h_305,dpr_2/f_auto,q_auto/v1673889659/wordpress_assets/Order166557-aegeanolive-grantbeige-porch-walkway-door-FRONT-A.jpg?_i=AA",
	"https://www.thespruce.com/thmb/GXHb2jCMMQ6xooGn6m57av2fVkk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/LindyeGallowayStudioShop2-dbb1af7650704b5e809bdce6905786d6-b617a43624b74b009139acba614ba4d5.jpeg",
	"https://www.bhg.com/thmb/6Xm03Ho-L_TMFP4mtni_p9qUGrg=/1533x0/filters:no_upscale():strip_icc()/blue-house-white-trim-b39ac766-26348030891c4035b677d043f9411754.jpg",
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
