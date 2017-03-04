import React from "react";

const TodoForm = ({addTodo}) => {

    return (
            <button type="submit" className="add-step-button" onClick={() => addTodo("")}>
                +
            </button>
    );
};

export default TodoForm;
