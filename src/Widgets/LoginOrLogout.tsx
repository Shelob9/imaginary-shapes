/** @jsx jsx */
import { jsx, Button } from "theme-ui";
import UserSessionContext from "../UserSessionProvider";
import { useContext } from "react";
export default function () {
	const { handleSignOut, isLoggedIn, handleSignIn } = useContext(
		UserSessionContext
	);

	const onClick = () => {
		if (isLoggedIn) {
			handleSignOut();
		} else {
			handleSignIn();
		}
	};
	return <Button onClick={onClick}>{isLoggedIn ? "Log Out" : "Log In"}</Button>;
}
