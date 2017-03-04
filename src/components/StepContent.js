import React from "react";

const StepContent = ({todo, index, editTodo, addTodo, removeStep}) => {
    // prevents onchange from firing and displaying \n, need to use onKeydown event as onKeyUp fires after change
    // aslo creates a new todo step
    function hitEnter(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            addTodo("");
        }
    }

    function loseFocus(event, index) {
        // If value does not exist remove step.
        if (!event.target.value)
            removeStep(index);
        }

    return (
        <div className="expandingTextArea">
            <div className="dummy-container">
                <span>
                    {todo.text}
                </span><br/>
            </div>
            <textarea autoFocus spellCheck="false" value={todo.text}
                onChange={(event) => editTodo(event.target.value, index)}
                onBlur={(event) => loseFocus(event, index)}
                onKeyDown={(event) => hitEnter(event)}>
            >
            </textarea>
        </div>
    );
}

export default StepContent;
