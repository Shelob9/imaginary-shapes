import React, { Suspense, useEffect } from "react";
import { UserSession, AppConfig } from "blockstack";
import { Switch, Route } from "react-router-dom";
import { Layout } from "./Layout";
import Header from "./Widgets/Header";
import { ItemsProvider } from "./ItemsContext";
import UserSessionContext, { UserSessionProvider } from "./UserSessionProvider";
import { Spinner } from "theme-ui";

const appConfig = new AppConfig(["store_write"], undefined, "/login-return");

const userSession = new UserSession({ appConfig: appConfig });

//Lazy-loaded pages
const ItemPage = React.lazy(() => import("./Pages/ItemPage"));
const ItemsPage = React.lazy(() => import("./Pages/ItemsPage"));
const NowPage = React.lazy(() => import("./Pages/NowPage"));
const HomePage = React.lazy(() => import("./Pages/HomePage"));
const NewItemPage = React.lazy(() => import("./Pages/NewItemPage"));
const HabbitTrackingPage = React.lazy(() =>
	import("./Pages/HabbitTrackingPage")
);
const FAQPage = React.lazy(() => import("./Pages/FAQPage"));

const Sidebar = React.lazy(() => import("./Sidebar"));

const HiRoy = () => <p>Hi Roy</p>;
const AuthReturn = () => {
	useEffect(() => {
		window.setTimeout(() => {
			window.location.replace("/");
		}, 500);
	});
	return <Spinner />;
};
//Wrapper
function Main() {
	const { isLoggedIn } = React.useContext(UserSessionContext);

	return (
		<Layout
			Sidebar={() => <div>{isLoggedIn ? <Sidebar /> : null}</div>}
			Header={() => <Header />}
		>
			<React.Fragment>
				<Switch>
					{isLoggedIn ? (
						<React.Fragment>
							<Route path="/roy">
								<HiRoy />
							</Route>
							<Route exact path="/login-return">
								<AuthReturn />
							</Route>
							<Route path="/faq">
								<FAQPage />
							</Route>
							<Route exact path={"/new"}>
								<NewItemPage />
							</Route>
							<Route exact path="/habits">
								<HabbitTrackingPage />
							</Route>
							<Route path="/items/:id">
								<ItemPage />
							</Route>
							<Route exact path="/items">
								<ItemsPage />
							</Route>
							<Route exact path="/now">
								<NowPage />
							</Route>
							<Route exact path="/">
								<NowPage />
							</Route>
						</React.Fragment>
					) : (
						<React.Fragment>
							<Route path="/roy">
								<p>Hi Roy</p>
							</Route>
							<Route exact path="/login-return">
								<AuthReturn />
							</Route>
							<Route exact path="/faq">
								<FAQPage />
							</Route>
							<Route exact path="/">
								<HomePage />
							</Route>
						</React.Fragment>
					)}
				</Switch>
			</React.Fragment>
		</Layout>
	);
}
export default function App() {
	return (
		<Suspense fallback={<Spinner />}>
			<UserSessionProvider userSession={userSession}>
				<ItemsProvider>
					<Main />
				</ItemsProvider>
			</UserSessionProvider>
		</Suspense>
	);
}
