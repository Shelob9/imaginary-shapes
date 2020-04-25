import React, { Suspense } from "react";
import Profile from "./Profile.js";
import Signin from "./Signin.js";
import { UserSession, AppConfig } from "blockstack";
import { Switch, Route } from "react-router-dom";

import { Layout } from "./Layout";
const appConfig = new AppConfig();
const userSession = new UserSession({ appConfig: appConfig });

//Lazy-loaded pages
const ItemPage = React.lazy(() => import("./Pages/ItemPage"));
const ItemsPage = React.lazy(() => import("./Pages/ItemsPage"));
const ItemsList = React.lazy(() => import("./Widgets/ItemsList"));

const Routes = (props: {
	handleSignOut: () => void;
	userSession: UserSession;
}) => {
	return (
		<Switch>
			<Route path="/profile">
				<Profile
					userSession={props.userSession}
					handleSignOut={props.handleSignOut}
				/>
			</Route>
			<Route path="/items/:id">
				<ItemPage userSession={props.userSession} /> />
			</Route>
			<Route path="/items">
				<ItemsPage userSession={props.userSession} />
			</Route>
			<Route path="/">Home Page</Route>
		</Switch>
	);
};

export default function App() {
	function handleSignIn() {
		userSession.redirectToSignIn();
	}

	function handleSignOut() {
		userSession.signUserOut(window.location.origin);
	}

	React.useEffect(() => {
		if (userSession.isSignInPending()) {
			userSession.handlePendingSignIn().then((userData) => {
				window.history.replaceState({}, document.title, "/");
			});
		}
	}, []);

	return (
		<Suspense fallback={"Loading"}>
			<Layout
				Sidebar={() => (
					<div>
						<ItemsList userSession={userSession} />
					</div>
				)}
				Header={() => <div>Header</div>}
			>
				{!userSession.isUserSignedIn() ? (
					<Signin userSession={userSession} handleSignIn={handleSignIn} />
				) : (
					<React.Fragment>
						<Routes userSession={userSession} handleSignOut={handleSignOut} />
					</React.Fragment>
				)}
			</Layout>
		</Suspense>
	);
}
