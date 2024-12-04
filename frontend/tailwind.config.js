/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				rausch: "#FF5A5F", // Primary Airbnb red
				babu: "#00A699", // Teal
				arches: "#FC642D", // Orange
				hof: "#484848", // Primary text gray
				foggy: "#767676", // Secondary text gray
				hackberry: "#7B0F2B", // Darker red
				kazan: "#273C3B", // Darker teal
				beach: "#FFB400", // Yellow
				lime: "#008A05", // Green

				// Extended palette
				airbnb: {
					50: "#FFF5F5",
					100: "#FED7D7",
					200: "#FEB2B2",
					300: "#FF8A8C",
					400: "#FF5A5F", // Primary brand color
					500: "#E74E54",
					600: "#CC4247",
					700: "#B2363B",
					800: "#992B2F",
					900: "#7F1D22",
				},

				// Neutral colors used by Airbnb
				neutral: {
					50: "#F7F7F7",
					100: "#EBEBEB",
					200: "#DDDDDD",
					300: "#CCCCCC",
					400: "#BBBBBB",
					500: "#767676",
					600: "#484848", // Primary text color
					700: "#383838",
					800: "#222222",
					900: "#111111",
				},
			},
			// You might also want to add Airbnb's font
			fontFamily: {
				sans: [
					"Circular",
					"-apple-system",
					"BlinkMacSystemFont",
					"Roboto",
					"Helvetica Neue",
					"sans-serif",
				],
			},
			// Common border radius values used by Airbnb
			borderRadius: {
				airbnb: "4px",
				"airbnb-md": "8px",
				"airbnb-lg": "12px",
				"airbnb-xl": "16px",
			},
			// Common box shadow values
			boxShadow: {
				airbnb: "0 1px 2px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.05)",
				"airbnb-hover":
					"0 2px 4px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.08)",
			},
		},
	},
	plugins: [],
};
