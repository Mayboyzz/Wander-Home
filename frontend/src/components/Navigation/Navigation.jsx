import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";

import { useState, useEffect } from "react";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const closeMenu = (e) => {
			if (!e.target.closest(".profile-dropdown")) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener("click", closeMenu);
		}

		return () => document.removeEventListener("click", closeMenu);
	}, [isOpen]);

	return (
		<nav className="bg-white border-b border-neutral-200">
			<div className="max-w-7xl mx-auto px-4">
				<div className="flex justify-between h-20">
					<div className="flex items-center">
						<NavLink to="/">
							<img
								data-testid="logo"
								src="/logo(2).png"
								alt="website logo"
								className="h-8"
							/>
						</NavLink>
					</div>

					{isLoaded && (
						<div className="flex items-center gap-4">
							<NavLink
								to="/spots/new"
								className="hidden md:block text-neutral-600 hover:text-neutral-800 font-medium text-sm"
							>
								List your home
							</NavLink>
							<div>
								<button
									type="button"
									onClick={(e) => {
										e.stopPropagation();
										setIsOpen(!isOpen);
									}}
								>
									<ProfileButton user={sessionUser} />
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</nav>
	);
}

export default Navigation;
