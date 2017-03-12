import React from "react";
import StepContent from "./StepContent";
import StepList from "./StepList";
import CSSTransitionGroup from "react-addons-css-transition-group";

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.hitEnter = this.hitEnter.bind(this);
        this.loseFocus = this.loseFocus.bind(this);
        this.updateSelection = this.updateSelection.bind(this);
        this.breakdownStep = this.breakdownStep.bind(this);
        this.renderStepCount = this.renderStepCount.bind(this);

        this.state = {
            stepSelected: false
        }
    }

    updateSelection() {
        const selected = this.state.stepSelected;
        this.setState({stepSelected: !selected});
    }

    breakdownStep(event) {
        // prevent event from propagating up to container
        event.stopPropagation();

        this.setState({stepSelected: true});

        this.props.addStep(this.props.index)
    }

    hitEnter(event){
        if(event.keyCode === 13)
            this.props.addTodo("");
    }

    loseFocus(event, key){
        // If value does not exist remove step.
        if(!event.target.value)
            this.props.remove(key);
    }

    // display the number of sub steps
    renderStepCount() {
        const steps = this.props.todo.steps;
        let numSteps = 0;
        let selectedClass = this.state.stepSelected ? "step-num-count selected" : "step-num-count";

        // count number of steps from object
        for(let key in steps) {
            if (steps.hasOwnProperty(key)) {
                numSteps++;
            }
        }

        // render count if substeps exist
        if(numSteps) {
            return (
                <div className={selectedClass}>{numSteps}</div>
            );
        } else {
            return ( <div className="step-bullet"></div> );
        }
    }


    render() {
        // If selected render sub steps
        let subSteps = !this.state.stepSelected ? "" : (
            <StepList
                steps={this.props.todo.steps}
                todoKey={this.props.index}
                removeStep={this.props.removeStep}
                addStep={this.props.addStep}
                editStep={this.props.editStep}
            />);

        // Each Todo - note - always remember to bind, functions, so they fire in the appropriate context.
        return (
            <li className="todo-item">
                <div className="todo-info" onClick={()=> this.updateSelection()}>
                    {this.renderStepCount()}

                    <StepContent
                        todo={this.props.todo}
                        index={this.props.index}
                        editTodo={this.props.editTodo}
                        addTodo={this.props.addTodo}
                        removeStep={this.props.remove}
                    />

                    <div className="todo-action-buttons">
                        <button className="remove-step-btn" onClick={() => this.props.remove(this.props.index)}>&times;</button>
                        <button className="create-sub-step-btn" onClick={(event) => this.breakdownStep(event)}>+</button>
                    </div>
                </div>
                {subSteps}
            </li>
        );
    }
}

export default Todo;
