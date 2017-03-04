import React from "react";
import StepList from "./StepList";

const Todo = ({todo, index, remove, addStep, editTodo, removeStep, editStep}) => {

    function removeTodo(id) {
        remove(id);
    }

    // Each Todo - note - always remember to bind, functions, so they fire in the appropriate context.
    return (
        <li className="todo-item">
            <div className="todo-info">
                <input type="text" value={todo.text} onChange={(event) =>editTodo(event.target.value, index)}/>
                <div className="todo-action-buttons">
                    <button onClick={() => addStep(index)}>Breakdown</button>
                    <button  onClick={() => removeTodo(index)}>&times;</button>
                </div>
            </div>
            <StepList
                steps={todo.steps}
                todoKey={index}
                removeStep={removeStep}
                addStep={addStep}
                editStep={editStep}
            />
        </li>
    );
}

export default Todo;
