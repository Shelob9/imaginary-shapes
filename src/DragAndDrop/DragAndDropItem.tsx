import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { dragAndDropItem } from "./types";

export default class DragAndDropItem extends React.Component<{
	item: dragAndDropItem;
	index: number;
}> {
	render() {
		const isDragDisabled = this.props.item.id === "task-1";
		return (
			<Draggable
				draggableId={this.props.item.id}
				index={this.props.index}
				isDragDisabled={isDragDisabled}
			>
				{(provided, snapshot) => (
					<div
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						innerRef={provided.innerRef}
						isDragging={snapshot.isDragging}
						isDragDisabled={isDragDisabled}
					>
						{this.props.item.content}
					</div>
				)}
			</Draggable>
		);
	}
}
