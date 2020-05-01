import React from "react";
import ItemsList from "./Widgets/ItemsList";
import SidebarNav from "./Widgets/SidebarNav";
const Sidebar = () => {
	return (
		<React.Fragment>
			<ItemsList />
			<SidebarNav />
		</React.Fragment>
	);
};

export default Sidebar;
