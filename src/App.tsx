import React, { Component } from "react";
import Profile from "./Profile.js";
import Signin from "./Signin.js";
import { UserSession, AppConfig } from "blockstack";
import { Switch, Route, useParams, useHistory } from "react-router-dom";
import { savedItemsCollection, SavedItem } from "./sorter/types.js";
import useSavedItems from "./TodoItem/useSavedItems";
import { New } from "./TodoItem/New";
const appConfig = new AppConfig();
const userSession = new UserSession({ appConfig: appConfig });

function Item() {
	let { id } = useParams();
	return <div>Now {id}</div>;
}

function Items(props: { activeItemId?: string }) {
	const { getItemById, addItem } = useSavedItems([]);
	const history = useHistory();
	const activeItem = React.useMemo<SavedItem | undefined>(() => {
		return props.activeItemId ? getItemById(props.activeItemId) : undefined;
	}, [props.activeItemId]);

	const onSave = (item: SavedItem) => {
		addItem(item);
		history.push(`/items/${item.id}`);
	};

	if (activeItem) {
		return <div>{activeItem.id}</div>;
	}
	return (
		<div>
			<div>Items List</div>
			<New onSave={onSave} />
		</div>
	);
}

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
				<Item />
			</Route>
			<Route path="/items">
				<Items />
			</Route>
			<Route path="/">
				<Items />
				<Profile
					userSession={props.userSession}
					handleSignOut={props.handleSignOut}
				/>
			</Route>
		</Switch>
	);
};
export default class App extends Component {
	handleSignIn() {
		userSession.redirectToSignIn();
	}

	handleSignOut() {
		userSession.signUserOut(window.location.origin);
	}

	render() {
		return (
			<div className="site-wrapper">
				<div className="site-wrapper-inner">
					{!userSession.isUserSignedIn() ? (
						<Signin
							userSession={userSession}
							handleSignIn={this.handleSignIn}
						/>
					) : (
						<React.Fragment>
							<Routes
								userSession={userSession}
								handleSignOut={this.handleSignOut}
							/>
						</React.Fragment>
					)}
				</div>
			</div>
		);
	}

	componentDidMount() {
		if (userSession.isSignInPending()) {
			userSession.handlePendingSignIn().then((userData) => {
				window.history.replaceState({}, document.title, "/");
				this.setState({ userData: userData });
			});
		}
	}
}
