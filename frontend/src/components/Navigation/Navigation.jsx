import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);

	return (
		<ul id="nav-bar">
			<li id="nav-home-button">
				<NavLink to="/">
					<img src="/logo(2).png" alt="website logo" />
				</NavLink>
			</li>
			{isLoaded && (
				<>
					<li>
						{sessionUser && (
							<NavLink
								style={{ color: "blue", fontWeight: 100, marginLeft: "auto" }}
								to="/spots/new"
							>
								Create a New Spot!
							</NavLink>
						)}
					</li>
					<li>
						<ProfileButton user={sessionUser} />
					</li>
				</>
			)}
		</ul>
	);
}

export default Navigation;
