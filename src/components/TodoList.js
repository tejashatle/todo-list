import React from "react";
import TodoCard from "./TodoCard";

export default function TodoList({ todos, dispatch }){
    return (
        <div className="container">
            {
                todos.map((item, index) => (
                    <TodoCard key={index} todo={item} dispatch={dispatch}></TodoCard>
                ))
            }

        </div>
    )
}
