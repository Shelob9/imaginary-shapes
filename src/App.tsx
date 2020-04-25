import React from "react";
import Profile from "./Profile.js";
import Signin from "./Signin.js";
import { UserSession, AppConfig, Person } from "blockstack";
import { Switch, Route, useParams, useHistory } from "react-router-dom";
import { SavedItem, savedItemsCollection } from "./sorter/types.js";
import useSavedItems from "./TodoItem/useSavedItems";
import { New } from "./TodoItem/New";
import { Edit } from "./TodoItem/Edit";
import { Layout } from "./Layout";
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
	}, [activeItemId, items]);

	const fileName = `todoItems_v1.json`;

	const _doSave = (items: savedItemsCollection) => {
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
	const saveItems = () => {
		return _doSave(items);
	};

	const saveNewItem = (newItem: SavedItem) => {
		const update = [...items, newItem];
		return _doSave(update);
	};

	const saveItem = (newItem: SavedItem) => {
		const update = items.map((item: SavedItem) => {
			return item.id === newItem.id ? newItem : item;
		});
		return _doSave(update);
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
		saveItem,
	};
}

const LoadingIndicator = (props: { isLoading: boolean }) =>
	props.isLoading ? <div>Loading Spinner</div> : null;
const SavingIndicator = (props: { isSaving: boolean }) =>
	props.isSaving ? <div>Saving Spinner</div> : null;

function ItemPage(props: { userSession: UserSession }) {
	const {
		activeItem,
		saveItem,
		setActiveItemId,
		isLoading,
		isSaving,
	} = useBlockStackSavedItems(props.userSession);
	let { id } = useParams();

	React.useEffect(() => {
		setActiveItemId(id);
	}, [id]);

	return (
		<React.Fragment>
			<LoadingIndicator isLoading={isLoading} />
			<SavingIndicator isSaving={isSaving} />
			{activeItem ? (
				<Edit
					onSave={saveItem}
					titleText={activeItem.title}
					initialItem={activeItem}
					submitText={"Update"}
				/>
			) : null}
		</React.Fragment>
	);
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
		saveNewItem(item).then(() => {
			addItem(item);
			history.push(`/items/${item.id}`);
		});
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
				<ItemPage userSession={props.userSession} /> />
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
		<Layout
			Sidebar={() => <div style={{ width: "151px" }}>Sidebar</div>}
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
	);
}
