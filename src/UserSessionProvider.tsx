import React from "react";
import { UserSession } from "blockstack";

const UserSessionContext = React.createContext<{
	userSession: UserSession;
	handleSignIn: () => void;
	handleSignOut: () => void;
}>(
	//@ts-ingore
	null
);
export function UserSessionProvider(props: {
	children: any;
	userSession: UserSession;
}) {
	const { children, userSession } = props;

	function handleSignIn() {
		userSession.redirectToSignIn();
	}

	function handleSignOut() {
		userSession.signUserOut(window.location.origin);
	}
	return (
		<UserSessionContext.Provider
			value={{ userSession, handleSignIn, handleSignOut }}
		>
			{children}
		</UserSessionContext.Provider>
	);
}

export default UserSessionContext;
