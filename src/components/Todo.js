import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from '../ItemTypes';
import StepContent from './StepContent';
import StepList from './StepList';

// React DnD - drag source: indicates functionality of draggable todo and what data will be passed to identify them
const todoSource = {
  beginDrag(props) {
    // returned properties will be passed to monitored item (shows up in monitor in hover())
    return {
      id: props.todo.id,
      index: props.index,
    };
  },
  // prevent move form occurring if drop happens outside of list.
  endDrag(props, monitor) {
    const { id: droppedId, index } = monitor.getItem();
    const didDrop = monitor.didDrop();

    if (!didDrop) {
      props.moveTodo(droppedId, index);
    }
  },
};

// indicates what info will be passed as props to the specified component
// connect - defines the role the wrapped component will play
// monitor - allows you to update a components props based on its drag/drop state
function sourceCollect(connect, monitor) {
  // What's returned will be passed as props to the wrapped component
  return {
    connectDragSource: connect.dragSource(), // turns wrapped root intro draggable component
    isDragging: monitor.isDragging(), // boolean to indicate whether or not dragging source
  };
}

const todoTarget = {
  hover(props, monitor) {
    const { id: dragID } = monitor.getItem();
    const { index: hoverIndex } = props;
    const hoverID = props.todo.id;

    // Don't replace items with themselves (don't use index as this changes as todo moves)
    if (dragID !== hoverID) {
      props.moveTodo(dragID, hoverIndex);
    }
  },
};

function targetCollect(connect) {
  // What's returned will be passed as props to the wrapped drop target component
  return {
    connectDropTarget: connect.dropTarget(), // wrap around component root to make it a drop target
  };
}

class Todo extends React.Component {
  constructor(props) {
    super(props);

    this.updateSelection = this.updateSelection.bind(this);
    this.breakdownStep = this.breakdownStep.bind(this);
    this.renderStepCount = this.renderStepCount.bind(this);
    this.handleRemove = this.handleRemove.bind(this);

    this.state = {
      stepSelected: false,
    };
  }

  updateSelection() {
    const selected = this.state.stepSelected;
    this.setState({ stepSelected: !selected });
  }

  breakdownStep(event) {
    // prevent event from propagating up to container
    event.stopPropagation();

    this.setState({ stepSelected: true });

    this.props.addStep(this.props.index);
  }

  handleRemove(event) {
    // prevent event from propagating up to container
    event.stopPropagation();
    this.props.remove(this.props.index);
  }

  // display the number of sub steps
  renderStepCount() {
    const steps = this.props.todo.steps;
    const numSteps = steps.length;
    const selectedClass = this.state.stepSelected ? 'step-num-count selected' : 'step-num-count';

    // render count if substeps exist
    if (numSteps) {
      return <div className={selectedClass}>{numSteps}</div>;
    }
    return <div className="step-bullet" />;
  }

  render() {
    const { isDragging, connectDragSource, connectDropTarget } = this.props;
    const opacity = isDragging ? 0 : 1;

    // If selected render sub steps
    const subSteps = !this.state.stepSelected
      ? null
      : (<StepList
        steps={this.props.todo.steps}
        todoIndex={this.props.index}
        todoID={this.props.todo.id}
        removeStep={this.props.removeStep}
        addStep={this.props.addStep}
        editStep={this.props.editStep}
        moveStep={this.props.moveStep}
      />);

    // Each Todo - note - always remember to bind, functions, so they fire in the appropriate context.
    return connectDragSource(
      connectDropTarget(
        <li className="todo-item" style={{ opacity }}>
          <div className="todo-info" onClick={() => this.updateSelection()} role="button" tabIndex={0}>
            {this.renderStepCount()}

            <StepContent
              todo={this.props.todo}
              index={this.props.index}
              editTodo={this.props.editTodo}
              addTodo={this.props.addTodo}
              addSubStep={this.props.addStep}
              removeStep={this.props.remove}
              stepSelected={this.state.stepSelected}
              updateSelection={this.updateSelection}
            />

            <div className="todo-action-buttons">
              <button className="remove-step-btn" onClick={event => this.handleRemove(event)}>
                &times;
              </button>
              <button className="create-sub-step-btn" onClick={event => this.breakdownStep(event)}>
                +
              </button>
            </div>
          </div>
          {subSteps}
        </li>,
      ),
    );
  }
}

// higher order components modifying BoardSquare to be a drop target.
// Parameters (1) - will only react to items of said type produced by "dragsource" / "droptarget"
// Parameters (2) - spec: describes how the "drag source" / "drop target" will react to drag and drop events
// Parameters (3) - Provides props to hook up component to DnD back end and check state of drag/drop
export default DragSource(ItemTypes.TODO, todoSource, sourceCollect)(
  DropTarget(ItemTypes.TODO, todoTarget, targetCollect)(Todo),
);
