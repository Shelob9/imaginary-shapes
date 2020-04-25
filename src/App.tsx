import React, { Component } from "react";
import Profile from "./Profile.js";
import Signin from "./Signin.js";
import { UserSession, AppConfig, Person } from "blockstack";
import { Switch, Route, useParams, useHistory } from "react-router-dom";
import { SavedItem, savedItemsCollection } from "./sorter/types.js";
import useSavedItems from "./TodoItem/useSavedItems";
import { New } from "./TodoItem/New";
import ItemList from "./TodoItem/ItemList";
const appConfig = new AppConfig();
const userSession = new UserSession({ appConfig: appConfig });

function useBlockStackSavedItems(
	userSession: UserSession,
	intitalActiveItemId?: string
) {
	const [isSaving, setIsSaving] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);
	const [activeItemId, setActiveItemId] = React.useState<string>(
		intitalActiveItemId
	);
	const {
		getItemById,
		addItem,
		items,
		updateItems,
		updateItem,
	} = useSavedItems([]);
	const activeItem = React.useMemo<SavedItem | undefined>(() => {
		return activeItemId ? getItemById(activeItemId) : undefined;
	}, [activeItemId]);

	const fileName = `todoItems_v1.json`;

	const saveItems = () => {
		return new Promise((resolve) => {
			const options = { encrypt: false };
			setIsSaving(true);
			userSession
				.putFile(fileName, JSON.stringify(items), options)
				.catch((e) => {
					console.log(e);
					resolve();
				})
				.finally(() => {
					setIsSaving(false);
					resolve();
				});
		});
	};

	const saveNewItem = (newItem: SavedItem) => {
		const update = [...items, newItem];
		return new Promise((resolve) => {
			const options = { encrypt: false };
			setIsSaving(true);
			userSession
				.putFile(fileName, JSON.stringify(update), options)
				.catch((e) => {
					console.log(e);
					resolve();
				})
				.finally(() => {
					updateItems(update);
					setIsSaving(false);
					resolve();
				});
		});
	};

	const getItems = () => {
		return new Promise((resolve) => {
			setIsLoading(true);
			const options = { decrypt: false };
			userSession
				.getFile(fileName, options)
				.then((file: string | undefined) => {
					const items = JSON.parse(file || "[]");
					console.log(items, file);
					updateItems(items);
				})
				.catch((e) => {
					console.log(e);
					resolve();
				})
				.finally(() => {
					setIsLoading(false);
					resolve();
				});
		});
	};
	//Call once to set items
	React.useEffect(() => {
		getItems();
	}, []);
	return {
		getItemById,
		addItem,
		activeItem,
		activeItemId,
		setActiveItemId,
		isSaving,
		isLoading,
		saveItems,
		updateItem,
		items,
		saveNewItem,
	};
}

function ItemPage() {
	let { id } = useParams();
	return <div>Now {id}</div>;
}

function ItemsPage(props: { userSession: UserSession }) {
	const {
		addItem,
		activeItem,
		saveNewItem,
		updateItem,
		items,
		setActiveItemId,
	} = useBlockStackSavedItems(props.userSession);
	const history = useHistory();

	const onSave = (item: SavedItem) => {
		saveNewItem(item).then(history.push(`/items/${item.id}`));
	};

	if (activeItem) {
		return <div>{activeItem.id}</div>;
	}
	return (
		<div>
			<div>Items List</div>
			<ItemList
				items={items}
				notFoundText={"No Items"}
				updateItem={updateItem}
				onOpenItem={setActiveItemId}
			/>
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
				<ItemPage />
			</Route>
			<Route path="/items">
				<ItemsPage userSession={props.userSession} />
			</Route>
			<Route path="/">
				<ItemsPage userSession={props.userSession} />
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
