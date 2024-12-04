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

	return (
		<div className="relative">
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
					<div className="py-2">
						<li className="px-4 py-2 text-neutral-600">
							Hello, {user.firstName}
						</li>
						<li className="px-4 pb-2 text-neutral-500 text-sm">{user.email}</li>
						<div className="border-t border-neutral-200 my-2">
							<li>
								<NavLink
									className="block px-4 py-3 hover:bg-neutral-50 transition-colors text-neutral-600"
									to="/spots/current"
									onClick={closeMenu}
								>
									Manage Spots
								</NavLink>
							</li>
						</div>
						<div className="border-t border-neutral-200">
							<li>
								<button
									type="button"
									onClick={logout}
									className="w-full px-4 py-3 text-left hover:bg-neutral-50 transition-colors text-neutral-600"
									style={{ width: "100%", textAlign: "inherit" }}
								>
									Log Out
								</button>
							</li>
						</div>
					</div>
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
							<div className="hover:bg-neutral-50 transition-colors">
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
