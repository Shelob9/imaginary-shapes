import React, { Suspense } from "react";
import { UserSession, AppConfig } from "blockstack";
import { Switch, Route } from "react-router-dom";
import { Layout } from "./Layout";
import Header from "./Widgets/Header";
import { ItemsProvider } from "./ItemsContext";
import UserSessionContext, { UserSessionProvider } from "./UserSessionProvider";

const appConfig = new AppConfig();
const userSession = new UserSession({ appConfig: appConfig });

//Lazy-loaded pages
const ItemPage = React.lazy(() => import("./Pages/ItemPage"));
const ItemsPage = React.lazy(() => import("./Pages/ItemsPage"));
const HomePage = React.lazy(() => import("./Pages/HomePage"));
const Sidebar = React.lazy(() => import("./Sidebar"));

//Wrapper
function Main() {
	const { isLoggedIn } = React.useContext(UserSessionContext);

	return (
		<Layout
			Sidebar={() => <div>{isLoggedIn ? <Sidebar /> : null}</div>}
			Header={() => <Header />}
		>
			{!isLoggedIn ? (
				<HomePage />
			) : (
				<React.Fragment>
					<Switch>
						{isLoggedIn ? (
							<React.Fragment>
								<Route path="/roy">
									<p>Hi Roy</p>
								</Route>

								<Route path="/items/:id">
									<ItemPage />
								</Route>
								<Route exact path="/items">
									<ItemsPage />
								</Route>
								<Route exact path="/">
									<ItemsPage />
								</Route>
							</React.Fragment>
						) : (
							<Route path="/">
								<HomePage />
							</Route>
						)}
					</Switch>
				</React.Fragment>
			)}
		</Layout>
	);
}
export default function App() {
	return (
		<Suspense fallback={"Loading"}>
			<UserSessionProvider userSession={userSession}>
				<ItemsProvider>
					<Main />
				</ItemsProvider>
			</UserSessionProvider>
		</Suspense>
	);
}
