import { useState } from "react";
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
					<label>Email</label>
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>

				{errors.email && <p>{errors.email}</p>}
				<div className="input-wrapper">
					<label>Username</label>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</div>
				{errors.username && <p>{errors.username}</p>}
				<div className="input-wrapper">
					<label>First Name</label>
					<input
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
					/>
				</div>
				{errors.firstName && <p>{errors.firstName}</p>}
				<div className="input-wrapper">
					<label>Last Name</label>
					<input
						type="text"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
					/>
				</div>
				{errors.lastName && <p>{errors.lastName}</p>}
				<div className="input-wrapper">
					<label>Password</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				{errors.password && <p>{errors.password}</p>}
				<div className="input-wrapper">
					<label>Confirm Password</label>
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</div>
				{errors.confirmPassword && <p>{errors.confirmPassword}</p>}
				<button type="submit">Sign Up</button>
			</form>
		</>
	);
}

export default SignupFormModal;
