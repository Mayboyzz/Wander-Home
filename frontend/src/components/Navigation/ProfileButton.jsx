import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { FaUserCircle } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";

import * as sessionActions from "../../store/session";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import OpenModalMenuItem from "./OpenModalMenuItem";
import { NavLink, useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";

function ProfileButton({ user }) {
	const dispatch = useDispatch();
	const [showMenu, setShowMenu] = useState(false);
	const ulRef = useRef();
	const navigate = useNavigate();

	const toggleMenu = (e) => {
		e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
		// if (!showMenu) setShowMenu(true);
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

	const ulClassName = "profile-dropdown" + (showMenu ? "" : "-hidden");
	const buttonClassName = "profile-button" + (showMenu ? "-active" : "");

	return (
		<>
			<button
				data-testid="user-menu-button"
				className={buttonClassName}
				onClick={toggleMenu}
			>
				<RxHamburgerMenu />
				<span> </span>
				<FaUserCircle />
			</button>

			<ul data-testid="user-dropdown-menu" className={ulClassName} ref={ulRef}>
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
							{" "}
							<NavLink
								className="manage-spots"
								to={"/spots/current"}
								style={{ fontWeight: "100" }}
								onClick={closeMenu}
							>
								Manage Spots
							</NavLink>
						</li>
						<li style={{ cursor: "pointer" }} onClick={logout}>
							<button>log out</button>
						</li>
					</>
				) : (
					<div className="menu">
						<OpenModalMenuItem
							modalComponent={<SignupFormModal />}
							itemText="Sign Up"
							onItemClick={closeMenu}
						/>

						<OpenModalMenuItem
							itemText="Log In"
							onItemClick={closeMenu}
							modalComponent={<LoginFormModal />}
						/>
					</div>
				)}
			</ul>
		</>
	);
}

export default ProfileButton;
