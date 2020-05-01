/** @jsx jsx */
import { jsx, Button, Spinner } from "theme-ui";
import UserSessionContext from "../UserSessionProvider";
import { useContext, useState, Fragment } from "react";
export default function (props: { children?: any }) {
	const { handleSignOut, isLoggedIn, handleSignIn } = useContext(
		UserSessionContext
	);

	const [clicked, setClicked] = useState(false);

	const onClick = () => {
		if (!clicked) {
			if (isLoggedIn) {
				handleSignOut();
			} else {
				handleSignIn();
			}
		}
		setClicked(true);
	};
	return (
		<Button onClick={onClick}>
			{clicked ? (
				<Spinner />
			) : (
				<Fragment>
					{props.children ? props.children : isLoggedIn ? "Log Out" : "Log In"}
				</Fragment>
			)}
		</Button>
	);
}
