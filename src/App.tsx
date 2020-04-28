import React, { Suspense } from "react";
import Signin from "./Signin";
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
	const { isLoggedIn } = React.useContext(UserSessionContext);
	return (
		<Switch>
			{isLoggedIn ? (
				<React.Fragment>
					<Route path="/items/:id">
						<ItemPage />
					</Route>
					<Route path="/items">
						<ItemsPage />
					</Route>
					<Route path="/">Home Page</Route>
				</React.Fragment>
			) : (
				<Route path="/">Hi</Route>
			)}
		</Switch>
	);
};

function Main() {
	const { isLoggedIn } = React.useContext(UserSessionContext);

	return (
		<Layout
			Sidebar={() => <div>{isLoggedIn ? <ItemsList /> : null}</div>}
			Header={() => <Header />}
		>
			{!isLoggedIn ? (
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
