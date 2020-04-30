import React from "react";
import DragAndDropItem from "./DragAndDropItem";
import { Droppable } from "react-beautiful-dnd";
import { dragAndDropColumm, dragAndDropItem } from "./types";
class List extends React.Component<{ innerRef: React.Ref<any> }> {
	render() {
		return <div ref={this.props.innerRef}>{this.props.children}</div>;
	}
}

export default class DragAndDropColumn extends React.Component<{
	column: dragAndDropColumm;
	items: Array<dragAndDropItem>;
}> {
	render() {
		return (
			<div>
				<Droppable droppableId={this.props.column.id} type="TASK">
					{(provided, snapshot) => (
						<List
							innerRef={provided.innerRef}
							{...provided.droppableProps}
							isDraggingOver={snapshot.isDraggingOver}
						>
							{this.props.items.map((item: dragAndDropItem, index) => (
								<DragAndDropItem key={item.id} item={item} index={index} />
							))}
							{provided.placeholder}
						</List>
					)}
				</Droppable>
			</div>
		);
	}
}
