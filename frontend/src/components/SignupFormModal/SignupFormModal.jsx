import { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./SignupFormPage.css";
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
				})
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
		<>
			<h1>Sign Up</h1>

			<form onSubmit={handleSubmit}>
				<div className="input-wrapper">
					<input
						type="text"
						value={firstName}
						placeholder="First Name"
						onChange={(e) => setFirstName(e.target.value)}
						required
					/>
				</div>

				{errors.firstName && <p>{errors.firstName}</p>}
				<div className="input-wrapper">
					<input
						type="text"
						value={lastName}
						placeholder="Last Name"
						onChange={(e) => setLastName(e.target.value)}
						required
					/>
				</div>
				{errors.lastName && <p>{errors.lastName}</p>}
				<div className="input-wrapper">
					<input
						type="text"
						value={email}
						placeholder="Email"
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				{errors.email && <p>{errors.email}</p>}
				<div className="input-wrapper">
					<input
						type="text"
						value={username}
						placeholder="Username"
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</div>
				{errors.username && <p>{errors.username}</p>}
				<div className="input-wrapper">
					<input
						type="password"
						value={password}
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				{errors.password && <p>{errors.password}</p>}
				<div className="input-wrapper">
					<input
						type="password"
						value={confirmPassword}
						placeholder="Confirm Password"
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</div>
				{errors.confirmPassword && <p>{errors.confirmPassword}</p>}
				<div className="input-wrapper">
					<button type="submit" disabled={button}>
						Sign Up
					</button>
				</div>
			</form>
		</>
	);
}

export default SignupFormModal;
