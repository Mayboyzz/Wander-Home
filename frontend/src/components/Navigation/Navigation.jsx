import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { FaPlus } from "react-icons/fa";
function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);

	return (
		<ul id="nav-bar">
			<li id="nav-home-button">
				<NavLink to="/">
					<img data-testid="logo" src="/logo(2).png" alt="website logo" />
				</NavLink>
			</li>
			{isLoaded && (
				<>
					<li className="right-nav-bar">
						{sessionUser && (
							<div style={{ display: "flex", alignItems: "center" }}>
								<NavLink id="add-button" to="/spots/new">
									<FaPlus />
								</NavLink>
								<NavLink
									id="new-spot-navlink"
									to="/spots/new"
									style={{
										marginRight: "10px",
										color: "blue",
									}}
								>
									Create a New Spot!
								</NavLink>
							</div>
						)}
						<ProfileButton user={sessionUser} />
					</li>
				</>
			)}
		</ul>
	);
}

export default Navigation;
