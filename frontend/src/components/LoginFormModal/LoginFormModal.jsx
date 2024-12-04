import { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

import { useModal } from "../../context/Modal";

function LoginFormModal() {
	const dispatch = useDispatch();

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
				if (data?.errors) {
					setErrors(data.errors);
				}
			});
	};

	useEffect(() => {
		credential.length >= 4 && password.length >= 6
			? setButton(false)
			: setButton(true);
	}, [credential, password]);

	return (
		<div className="flex items-center justify-center min-h-full">
			<div className="w-full max-w-md p-6 bg-white rounded-lg">
				<h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
					Log In
				</h1>
				<form
					data-testid="login-modal"
					onSubmit={handleSubmit}
					className="space-y-4"
				>
					<label className="block">
						<input
							data-testid="credential-input"
							type="text"
							value={credential}
							placeholder="Username / Email"
							onChange={(e) => setCredential(e.target.value)}
							required
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
						/>
					</label>
					<label className="block">
						<input
							data-testid="password-input"
							type="password"
							value={password}
							placeholder="Password"
							onChange={(e) => setPassword(e.target.value)}
							required
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
						/>
					</label>
					<div className="flex flex-col gap-3 mt-6">
						<button
							type="button"
							className="w-full px-4 py-2 text-white bg-gray-500 hover:bg-gray-600 rounded-lg transition-colors"
							onClick={() => {
								setCredential("JohnSmith");
								setPassword("password");
								handleSubmit();
							}}
						>
							Demo User
						</button>
						<button
							data-testid="login-button"
							type="submit"
							disabled={button}
							className={`w-full px-4 py-2 text-white rounded-lg transition-colors ${
								button
									? "bg-blue-300 cursor-not-allowed"
									: "bg-blue-500 hover:bg-blue-600"
							}`}
						>
							Log In
						</button>
					</div>
					{errors.credential && (
						<p className="mt-2 text-sm text-red-600">{errors.credential}</p>
					)}
				</form>
			</div>
		</div>
	);
}

export default LoginFormModal;
