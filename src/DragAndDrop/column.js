import React from 'react'
import Item from './Item'
import { Droppable } from 'react-beautiful-dnd'

class Container extends React.Component {
  render() {
    return <div ref={this.props.innerRef}>{this.props.children}</div>
  }
}

class TaskList extends React.Component {
  render() {
    return <div ref={this.props.innerRef}>{this.props.children}</div>
  }
}

export default class Column extends React.Component {
  render() {
    return (
      <Container>
        <h3>{this.props.column.title}</h3>
        <Droppable droppableId={this.props.column.id} type="TASK">
          {(provided, snapshot) => (
            <TaskList
              innerRef={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {this.props.items.map((task, index) => (
                <Item key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </Container>
    )
  }
}
