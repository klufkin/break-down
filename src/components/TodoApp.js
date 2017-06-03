import React from "react";
import Title from "./Title";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { DragDropContext } from "react-dnd"; // package required for drag and drop
import HTML5Backend from "react-dnd-html5-backend"; // backend for drag and drop
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
            todos: []
        };
    }

    // Runs right before the moment of rendering onto the page (only runs once)
    componentWillMount() {
        // check if there is any todos in local storage
        const localStorageRef = localStorage.getItem(`todos`);

        if (localStorageRef) {
            const todos = JSON.parse(localStorageRef);
            // update our App component order state
            this.setState({
                todos: Object.keys(todos).map(key => todos[key]) // Parses object into array format
            });
        }
    }

    // // runs whenever props or state updates
    // // updated props and state passed in
    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem(`todos`, JSON.stringify(nextState.todos));
    }

    // Add todo handler
    addTodo(val) {
        const todos = [...this.state.todos];
        const timestamp = Date.now();

        // Update todos
        todos.push({
            text: val,
            steps: [],
            id: timestamp
        });

        // Update state
        this.setState({ todos });
    }

    editTodo(val, key) {
        const todos = [...this.state.todos];

        todos[key].text = val;

        this.setState({ todos });
    }

    // Handle remove
    handleRemove(key) {
        const todos = [...this.state.todos];
        todos.splice(key, 1);
        this.setState({ todos });
    }

    addStep(key) {
        const todos = [...this.state.todos];

        //set step
        const step = {
            id: Date.now(), // setting a timestamp for id
            text: ""
        };

        todos[key].steps.push(step);

        // Update state
        this.setState({ todos });
    }

    editStep(todoKey, stepKey, value) {
        // copy todos state
        const todos = [...this.state.todos];
        // edit sub step
        todos[todoKey].steps[stepKey].text = value;
        // Update state
        this.setState({ todos });
    }

    removeStep(todoKey, stepKey) {
        // copy todos state
        const todos = [...this.state.todos];
        // remove sub step
        todos[todoKey].steps.splice(stepKey, 1);
        // update state
        this.setState({ todos });
    }

    render() {
        // count steps for empty and non empty state
        let numSteps = this.state.todos.length;

        // Render JSX
        return (
            <div className="breakdown-container">
                <header className="breakdown-header">
                    <Title />
                    <TodoForm addTodo={this.addTodo} numSteps={numSteps} />
                </header>
                <TodoList
                    todos={this.state.todos}
                    addTodo={this.addTodo}
                    remove={this.handleRemove}
                    addStep={this.addStep}
                    editTodo={this.editTodo}
                    removeStep={this.removeStep}
                    editStep={this.editStep}
                    numSteps={numSteps}
                />
            </div>
        );
    }
}

// indicates the backend we wish to use and the component we want to use as the context
export default DragDropContext(HTML5Backend)(TodoApp);
