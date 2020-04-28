import React, { Suspense } from "react";
import Profile from "./Profile.js";
import Signin from "./Signin.js";
import { UserSession, AppConfig } from "blockstack";
import { Switch, Route } from "react-router-dom";
import ItemsList from "./Widgets/ItemsList";
import { Layout } from "./Layout";
import Header from "./Widgets/Header";
import { ItemsProvider } from "./ItemsContext";
import UserSessionContext, { UserSessionProvider } from "./UserSessionProvider";
const appConfig = new AppConfig();
const userSession = new UserSession({ appConfig: appConfig });

//Lazy-loaded pages
const ItemPage = React.lazy(() => import("./Pages/ItemPage"));
const ItemsPage = React.lazy(() => import("./Pages/ItemsPage"));

const Routes = () => {
	const { userSession, handleSignOut } = React.useContext(UserSessionContext);
	return (
		<Switch>
			<Route path="/profile">
				<Profile userSession={userSession} handleSignOut={handleSignOut} />
			</Route>
			<Route path="/items/:id">
				<ItemPage />
			</Route>
			<Route path="/items">
				<ItemsPage />
			</Route>
			<Route path="/">Home Page</Route>
		</Switch>
	);
};

function Main() {
	const { userSession } = React.useContext(UserSessionContext);
	return (
		<Layout
			Sidebar={() => <div>{userSession ? <ItemsList /> : null}</div>}
			Header={() => <Header />}
		>
			{!userSession.isUserSignedIn() ? (
				<Signin />
			) : (
				<React.Fragment>
					<Routes />
				</React.Fragment>
			)}
		</Layout>
	);
}
export default function App() {
	React.useEffect(() => {
		if (userSession.isSignInPending()) {
			userSession.handlePendingSignIn().then((userData) => {
				window.history.replaceState({}, document.title, "/");
			});
		}
	}, []);

	return (
		<Suspense fallback={"Loading"}>
			<UserSessionProvider userSession={userSession}>
				<ItemsProvider userSession={userSession}>
					<Main />
				</ItemsProvider>
			</UserSessionProvider>
		</Suspense>
	);
}
