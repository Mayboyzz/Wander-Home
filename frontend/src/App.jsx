import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation/Navigation";
import LandingPage from "./components/LandingPage";
import SpotPage from "./components/SpotPage";
import NewSpotForm from "./components/NewSpotForm";
import ManageSpotsPage from "./components/ManageSpotsPage";
import EditSpot from "./components/ManageSpotsPage/EditSpot";
import { ManageBookings } from "./components/Bookings/ManageBookingsPage";

function Layout() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => {
			setIsLoaded(true);
		});
	}, [dispatch]);

	return (
		<>
			<Navigation isLoaded={isLoaded} />

			{isLoaded && <Outlet />}
		</>
	);
}

const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <LandingPage />,
			},
			{ path: "/profile", element: <ManageUserPage /> },
			{
				path: "/spots/:spotId",
				element: <Outlet />,
				children: [
					{
						index: true,
						element: <SpotPage />,
					},
					{
						path: "edit",
						element: <EditSpot />,
					},
				],
			},
			{
				path: "/spots/new",
				element: <NewSpotForm />,
			},
			{
				path: "/spots/current",
				element: <ManageSpotsPage />,
			},
			{
				path: "/bookings",
				element: <ManageBookings />,
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
