import React from 'react';
import StepContent from './StepContent';
import StepList from './StepList';

class Todo extends React.Component {
  constructor(props) {
    super(props);

    this.updateSelection = this.updateSelection.bind(this);
    this.breakdownStep = this.breakdownStep.bind(this);
    this.renderStepCount = this.renderStepCount.bind(this);

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
    // If selected render sub steps
    const subSteps = !this.state.stepSelected
      ? ''
      : (<StepList
        steps={this.props.todo.steps}
        todoKey={this.props.index}
        removeStep={this.props.removeStep}
        addStep={this.props.addStep}
        editStep={this.props.editStep}
      />);

    // Each Todo - note - always remember to bind, functions, so they fire in the appropriate context.
    return (
      <li className="todo-item">
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
            <button className="remove-step-btn" onClick={() => this.props.remove(this.props.index)}>
              &times;
            </button>
            <button className="create-sub-step-btn" onClick={event => this.breakdownStep(event)}>
              +
            </button>
          </div>
        </div>
        {subSteps}
      </li>
    );
  }
}

export default Todo;
