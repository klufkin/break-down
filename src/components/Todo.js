import React from "react";
import StepList from "./StepList";

const Todo = ({todo, index, remove, addStep, setStep, removeStep, editStep}) => {

    function removeTodo(id) {
        remove(id);
    }

    // Each Todo - note - always remember to bind, functions, so they fire in the appropriate context.
    return (
        <li className="todo-item">
            <div className="todo-info">
                {todo.text}
                <div>
                    <button onClick={() => addStep(index)}>Breakdown</button>
                    <button  onClick={() => removeTodo(index)}>&times;</button>
                </div>
            </div>
            <StepList
                steps={todo.steps}
                todoKey={index}
                setStep={setStep}
                removeStep={removeStep}
                addStep={addStep}
                editStep={editStep}
            />
        </li>
    );
}

export default Todo;
