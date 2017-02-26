import React from "react";

const TodoForm = ({addTodo}) => {
    // Input tracker
    let input;

    function createTodo(event){
        event.preventDefault();
        addTodo(input.value);
        input.value = '';
    }

    return (
        <form onSubmit={ (event) => {createTodo(event)}}>
            <input ref={ (inputNode) => { input = inputNode; }} />
            <button type="submit">
                +
            </button>
        </form >
    );
};

export default TodoForm;
