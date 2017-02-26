import React from "react";
import Title from "./Title";
import TodoForm from './TodoForm';
import TodoList from "./TodoList";
import "../css/TodoApp.css";

// Contaner Component
class TodoApp extends React.Component {
    constructor() {
        // Pass props to parent class
        super();

        this.addTodo = this.addTodo.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.addStep = this.addStep.bind(this);
        this.setStep = this.setStep.bind(this);
        this.removeStep = this.removeStep.bind(this);
        this.editStep = this.editStep.bind(this);

        // Set initial state
        this.state = {
            todos: {}
        }
    }

    // Runs right before the moment of rendering onto the page (only runs once)
    componentWillMount() {
        // check if there is any order in local storage
        const localStorageRef = localStorage.getItem(`todos`);

        if(localStorageRef){
            // update our App component order state
            this.setState({
                todos: JSON.parse(localStorageRef)
            })
        }
    }

    // // runs whenever props or state updates
	// // updated props and state passed in
	componentWillUpdate (nextProps, nextState) {
		localStorage.setItem(`todos`,
			JSON.stringify(nextState.todos));
	}

    // Add todo handler
    addTodo(val) {
        const todos = {...this.state.todos};

        const timestamp = Date.now();

        // Update todos
        todos[`todo-${timestamp}`] = {
            text: val,
            steps: {}
        };

        // Update state
        this.setState({todos});
    }
    // Handle remove
    handleRemove(key) {
        const todos = {...this.state.todos};
        delete todos[key];
        this.setState({todos});
    }

    addStep(key){
        const todos = {...this.state.todos};
        const steps = todos[key].steps;
        const timestamp = Date.now();

        //set step
        steps[`step-${timestamp}`] = {
            text: "",
            edit: true
        }

        // Update state
        this.setState({todos});
    }

    editStep(todoKey, stepKey, value){
        // copy todos state
        const todos = {...this.state.todos};
        // update value
        todos[todoKey].steps[stepKey].text = value;
        // Update state
        this.setState({todos});
    }

    removeStep(todoKey, stepKey) {
        const todos = {...this.state.todos};
        delete todos[todoKey].steps[stepKey];
        this.setState({todos});
    }

    setStep(todoKey, stepKey, editable){
        // copy todos state
        const todos = {...this.state.todos};
        todos[todoKey].steps[stepKey].edit = editable;

        // Update state
        this.setState({todos});
    }

    render() {
        // Render JSX
        return (
            <div>
                <Title/>
                <TodoForm addTodo={this.addTodo}/>
                <TodoList
                    todos={this.state.todos}
                    remove={this.handleRemove}
                    setStep={this.setStep}
                    addStep={this.addStep}
                    removeStep={this.removeStep}
                    editStep={this.editStep}
                    />
            </div>
        );
    }
}

export default TodoApp;
