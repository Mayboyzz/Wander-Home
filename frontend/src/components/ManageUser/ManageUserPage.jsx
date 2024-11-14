import { useSelector } from "react-redux";
import "./ManageUserPage.css";

const ManageUserPage = () => {
	const sessionUser = useSelector((state) => state.session.user);

	return (
		<div className="profile-container">
			<h1>Manage Profile</h1>
			<div className="profile-edit-wrapper">
				<img src="image.png" alt="profile icon" />
				<div className="profile-edit-form">
					<input placeholder="First Name" />
					<input placeholder="Last Name" />
					<input placeholder="Username" />
					<input placeholder="E-Mail" />
					<input placeholder="Password" />
				</div>
			</div>
		</div>
	);
};

export default ManageUserPage;
