import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { FaUserCircle } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";

import * as sessionActions from "../../store/session";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import OpenModalMenuItem from "./OpenModalMenuItem";
import { NavLink, useNavigate } from "react-router-dom";

function ProfileButton({ user }) {
	const dispatch = useDispatch();
	const [showMenu, setShowMenu] = useState(false);
	const ulRef = useRef();
	const navigate = useNavigate();

	const toggleMenu = (e) => {
		e.stopPropagation();
		setShowMenu(!showMenu);
	};

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = (e) => {
			if (!ulRef.current.contains(e.target)) {
				setShowMenu(false);
			}
		};

		document.addEventListener("click", closeMenu);

		return () => document.removeEventListener("click", closeMenu);
	}, [showMenu]);

	const closeMenu = () => setShowMenu(false);

	const logout = (e) => {
		e.preventDefault();
		dispatch(sessionActions.logout());
		closeMenu();
		navigate("/");
	};

	const ulClassName = `profile-dropdown${showMenu ? "" : "-hidden"}`;
	const buttonClassName = `profile-button${showMenu ? "-active" : ""}`;

	return (
		<>
			{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
			<button
				type="button"
				className={`flex items-center gap-2 p-3 rounded-full border border-neutral-200 hover:shadow-airbnb transition-all bg-white
					${showMenu ? "shadow-airbnb" : ""}`}
				onClick={toggleMenu}
			>
				<RxHamburgerMenu className="text-neutral-600 text-lg" />
				<FaUserCircle className="text-neutral-500 text-lg" />
			</button>

			<ul
				data-testid="user-dropdown-menu"
				className={`absolute right-0 top-[calc(100%+8px)] w-[240px] bg-white rounded-airbnb-lg shadow-airbnb
					${showMenu ? "block" : "hidden"}`}
				ref={ulRef}
			>
				{user ? (
					<>
						<li>Hello, {user.firstName}</li>
						<li style={{ marginBottom: "10px" }}>{user.email}</li>
						<li
							style={{
								borderTop: "1px solid black",
								borderBottom: "1px solid black",
								padding: "8px 0",
								cursor: "pointer",
							}}
						>
							<NavLink
								className="manage-spots"
								to={"/spots/current"}
								style={{ fontWeight: "100" }}
								onClick={closeMenu}
							>
								Manage Spots
							</NavLink>
						</li>
						<li
							style={{
								borderBottom: "1px solid black",
								padding: "8px 0",
								cursor: "pointer",
							}}
						>
							<NavLink
								className="manage-spots"
								to={"/profile"}
								style={{ fontWeight: "100" }}
								onClick={closeMenu}
							>
								Manage Profile
							</NavLink>
						</li>
						{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
						<li style={{ cursor: "pointer" }} onClick={logout}>
							{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
							<button>log out</button>
						</li>
					</>
				) : (
					<div className="py-2">
						<div className="text-neutral-600">
							<div className="hover:bg-neutral-50 transition-colors">
								<div className="px-4 py-3">
									<OpenModalMenuItem
										modalComponent={<SignupFormModal />}
										itemText="Sign Up"
										onItemClick={closeMenu}
									/>
								</div>
							</div>
							<div className="hover:bg-neutral-50 transition-colors border-t border-neutral-200">
								<div className="px-4 py-3">
									<OpenModalMenuItem
										itemText="Log In"
										onItemClick={closeMenu}
										modalComponent={<LoginFormModal />}
									/>
								</div>
							</div>
						</div>
					</div>
				)}
			</ul>
		</div>
	);
}

export default ProfileButton;
