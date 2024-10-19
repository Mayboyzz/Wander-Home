import { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css";
import { useModal } from "../../context/Modal";
// import { useNavigate } from "react-router-dom";

function LoginFormModal() {
	const dispatch = useDispatch();
	// const navigate = useNavigate();
	const [credential, setCredential] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({});
	const { closeModal } = useModal();
	const [button, setButton] = useState(true);

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors({});
		return dispatch(sessionActions.login({ credential, password }))
			.then(closeModal)
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) setErrors(data.errors);
			});
	};

	useEffect(() => {
		credential.length >= 4 && password.length >= 6
			? setButton(false)
			: setButton(true);
	}, [credential, password]);

	// const login = (e) => {
	// 	e.preventDefault();
	// 	navigate("/");
	// };
	return (
		<>
			<h1>Log In</h1>
			<form data-testid="login-modal" onSubmit={handleSubmit}>
				<label className="login-form">
					<input
						data-testid="credential-input"
						type="text"
						value={credential}
						placeholder="Username / Email"
						onChange={(e) => setCredential(e.target.value)}
						required
					/>
				</label>
				<label className="login-form">
					<input
						data-testid="password-input"
						type="password"
						value={password}
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<label className="login-form-buttons">
					<div>
						<button
							className="demo-user-button"
							onClick={() => {
								setCredential("JohnSmith");
								setPassword("password");
								handleSubmit();
							}}
						>
							Demo User
						</button>
					</div>
					<div>
						<button data-testid="login-button" type="submit" disabled={button}>
							Log In
						</button>
					</div>
				</label>
				{errors.credential && (
					<p style={{ color: "red" }}>{errors.credential}</p>
				)}
			</form>
		</>
	);
}

export default LoginFormModal;
