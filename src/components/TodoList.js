import React from "react";
import TodoCard from "./TodoCard";

export default function TodoList({ todos, dispatch }){

    const handleEdit = (e, todo) =>{
        dispatch({
            type: "SET_EDITING_TODO",
            payload: todo
        })
    }   

    const handleDelete = (e, todo) => {
        dispatch({ type: "DELETE_TODO", payload: todo.id });
        dispatch({type: "CANCEL_EDITING_TODO"})
    }

    
    return (
        <div className="container mt-4">

             <table className="table">
                <thead className="table-light">
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Due Date</th>
                        <th>Priority</th>
                        <th>Bucket</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                 <tbody className="table-group-divider">
                   
            {
                todos.map((item, index) => (
                    <tr>
                        <td>{item.todoTitle}</td>
                        <td>{item.todoDescription}</td>
                        <td>{item.todoStatus}</td>
                        <td>{item.todoDueDate}</td>
                        <td>{item.todoPriority}</td>
                        <td>{item.todoBucket}</td>
                        <td>
                            <button type="submit" className="btn btn-outline-primary btn-sm mx-2 px-4" onClick={(e) => handleEdit(e, item)} >Edit</button>
                            <button type="submit" className="btn btn-outline-danger btn-sm px-4" onClick={(e) => handleDelete(e, item)} >Delete</button>
                        </td>
                    </tr>
                ))
            }
            
                </tbody>
            </table>
        </div>
    )
}
