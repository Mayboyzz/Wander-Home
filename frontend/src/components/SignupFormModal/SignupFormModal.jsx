import { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

import { useModal } from "../../context/Modal";

function SignupFormModal() {
	const dispatch = useDispatch();

	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState({});
	const { closeModal } = useModal();
	const [button, setButton] = useState(true);

	useEffect(() => {
		password.length >= 6 &&
		email.length >= 1 &&
		username.length >= 4 &&
		firstName.length >= 1 &&
		lastName.length >= 1 &&
		confirmPassword.length >= 6
			? setButton(false)
			: setButton(true);
	}, [password, email, username, firstName, lastName, confirmPassword]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			setErrors({});
			return dispatch(
				sessionActions.signup({
					email,
					username,
					firstName,
					lastName,
					password,
				}),
			)
				.then(closeModal)
				.catch(async (res) => {
					const data = await res.json();
					if (data?.errors) {
						setErrors(data.errors);
					}
				});
		}
		return setErrors({
			confirmPassword:
				"Confirm Password field must be the same as the Password field.",
		});
	};

	return (
		<div className="flex flex-col items-center p-4">
			<h1 className="text-3xl font-bold mb-6">Sign Up</h1>

			<form
				data-testid="sign-up-form"
				onSubmit={handleSubmit}
				className="flex flex-col gap-3 w-full max-w-md"
			>
				<div className="input-wrapper">
					<input
						data-testid="first-name-input"
						type="text"
						value={firstName}
						placeholder="First Name"
						onChange={(e) => setFirstName(e.target.value)}
						required
						className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
					/>
				</div>
				{errors.firstName && (
					<p className="text-red-500 text-sm">{errors.firstName}</p>
				)}

				<div className="input-wrapper">
					<input
						data-testid="last-name-input"
						type="text"
						value={lastName}
						placeholder="Last Name"
						onChange={(e) => setLastName(e.target.value)}
						required
						className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
					/>
				</div>
				{errors.lastName && (
					<p className="text-red-500 text-sm">{errors.lastName}</p>
				)}

				<div className="input-wrapper">
					<input
						data-testid="email-input"
						type="text"
						value={email}
						placeholder="Email"
						onChange={(e) => setEmail(e.target.value)}
						required
						className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
					/>
				</div>
				{errors.email && (
					<p className="text-red-500 text-sm" data-testid="email-error-message">
						{errors.email}
					</p>
				)}

				<div className="input-wrapper">
					<input
						data-testid="username-input"
						type="text"
						value={username}
						placeholder="Username"
						onChange={(e) => setUsername(e.target.value)}
						required
						className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
					/>
				</div>
				{errors.username && (
					<p
						className="text-red-500 text-sm"
						data-testid="username-error-message"
					>
						{errors.username}
					</p>
				)}

				<div className="input-wrapper">
					<input
						data-testid="password-input"
						type="password"
						value={password}
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
						required
						className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
					/>
				</div>
				{errors.password && (
					<p className="text-red-500 text-sm">{errors.password}</p>
				)}

				<div className="input-wrapper">
					<input
						data-testid="confirm-password-input"
						type="password"
						value={confirmPassword}
						placeholder="Confirm Password"
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
						className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
					/>
				</div>
				{errors.confirmPassword && (
					<p className="text-red-500 text-sm">{errors.confirmPassword}</p>
				)}

				<div className="input-wrapper">
					<button
						data-testid="form-sign-up-button"
						type="submit"
						disabled={button}
						className={`w-full py-2 px-4 rounded-lg text-white font-semibold
							${
								button
									? "bg-gray-400 cursor-not-allowed"
									: "bg-blue-500 hover:bg-blue-600 transition-colors"
							}`}
					>
						Sign up
					</button>
				</div>
			</form>
		</div>
	);
}

export default SignupFormModal;
