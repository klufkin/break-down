import React from "react";
import Todo from "./Todo";

const TodoList = ({todos, remove, addStep, setStep, removeStep, editStep}) => {
    return (
        <ul className="todo-list">
            {Object.keys(todos).map( key =>
                <Todo
                    todo={todos[key]}
                    key={key}
                    index={key}
                    remove={remove}
                    addStep={addStep}
                    setStep={setStep}
                    removeStep={removeStep}
                    editStep={editStep}
                />
            )}
        </ul>
    );
}

export default TodoList;
