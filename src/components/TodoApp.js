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
        this.editTodo = this.editTodo.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.addStep = this.addStep.bind(this);
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

    editTodo(val, key) {
        const todos = {...this.state.todos};

        todos[key].text = val;

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

        console.log("addstep");

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

    render() {
        // Render JSX
        return (
            <div className="breakdown-container">
                <header className="breakdown-header">
                    <Title/>
                    <TodoForm addTodo={this.addTodo}/>
                </header>
                <TodoList
                    todos={this.state.todos}
                    remove={this.handleRemove}
                    addStep={this.addStep}
                    editTodo={this.editTodo}
                    removeStep={this.removeStep}
                    editStep={this.editStep}
                    />
            </div>
        );
    }
}

export default TodoApp;
