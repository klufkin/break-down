import React from "react";
import Todo from "./Todo";

const TodoList = ({todos, remove, addTodo, addStep, editTodo, removeStep, editStep}) => {
    return (
        <ul className="todo-list">
            {Object.keys(todos).map( key =>
                <Todo
                    todo={todos[key]}
                    key={key}
                    index={key}
                    addTodo={addTodo}
                    remove={remove}
                    editTodo={editTodo}
                    addStep={addStep}
                    removeStep={removeStep}
                    editStep={editStep}
                />
            )}
        </ul>
    );
}

export default TodoList;
