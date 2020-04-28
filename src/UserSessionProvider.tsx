import React from "react";
import { UserSession } from "blockstack";
import { useHistory } from "react-router-dom";
const UserSessionContext = React.createContext<{
	userSession: UserSession;
	handleSignIn: () => void;
	handleSignOut: () => void;
	isLoggedIn: boolean;
}>(
	//@ts-ingore
	null
);

export function UserSessionProvider(props: {
	children: any;
	userSession: UserSession;
}) {
	const { children, userSession } = props;
	const history = useHistory();
	function handleSignIn() {
		userSession.redirectToSignIn();
	}

	function handleSignOut() {
		userSession.signUserOut("/");
	}

	const isLoggedIn = React.useMemo(() => {
		return userSession.isUserSignedIn();
	}, [userSession]);

	React.useEffect(() => {
		if (userSession.isSignInPending()) {
			userSession.handlePendingSignIn().then((userData) => {
				history.push("/");
				window.history.replaceState({}, document.title, "/");
			});
		}
	});

	return (
		<UserSessionContext.Provider
			value={{ userSession, handleSignIn, handleSignOut, isLoggedIn }}
		>
			{children}
		</UserSessionContext.Provider>
	);
}

export default UserSessionContext;
