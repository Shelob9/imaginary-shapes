import React, { Suspense } from "react";
import Signin from "./Signin";
import { UserSession, AppConfig } from "blockstack";
import { Switch, Route } from "react-router-dom";
import ItemsList from "./Widgets/ItemsList";
import { Layout } from "./Layout";
import Header from "./Widgets/Header";
import { ItemsProvider } from "./ItemsContext";
import UserSessionContext, { UserSessionProvider } from "./UserSessionProvider";
import DragAndDrop from "./DragAndDrop/DragAndDrop";
import initialData from "./DragAndDrop/initial-data";
import { dragAndDropState } from "./DragAndDrop/types";

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
					<Route path="/roy">
						<p>Hi Roy</p>
					</Route>
					<Route path="/items/:id">
						<ItemPage />
					</Route>
					<Route path="/items">
						<ItemsPage />
					</Route>
					<Route path="/test">
						<DragAndDrop
							initialData={initialData}
							stateMiddleWare={(update: dragAndDropState) => {
								console.log(update);
								return update;
							}}
						/>
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
				<ItemsProvider>
					<Main />
				</ItemsProvider>
			</UserSessionProvider>
		</Suspense>
	);
}
