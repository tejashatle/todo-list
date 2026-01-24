import React from "react";
import TodoCard from "./TodoCard";
import { todoApiService } from "../services/todoApi";

export default function TodoList({ todos, dispatch, setStatus }){

    const handleEdit = (e, todo) =>{
        dispatch({
            type: "SET_EDITING_TODO",
            payload: todo
        })
    }   

    const handleDelete = async (e, todo) => {
        try{
            const response = await todoApiService.deleteTodo(todo.todoId);
            dispatch({ type: "DELETE_TODO", payload: todo.todoId });
        }catch(error){
            console.error(error);
        }
        
        dispatch({ type: "CANCEL_EDITING_TODO"})
    }

    const handleIsChecked = (e, todo) => {
        if(e.target.checked){
            todo.todoStatus = "Completed";
        }else{
            todo.todoStatus = "In Progress";
        }
        dispatch({
            type: "IS_COMPLETED",
            payload: todo
        })
    }
    
    return (
        <div className="container mt-4">

             <table className="table">
                <thead className="table-light">
                    <tr>
                        <th></th>
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
                    <tr className={item.todoStatus === "Completed" ? 'text-decoration-line-through' : ''}>   
                        <td key={index}>
                            <input class="form-check-input" type="checkbox" value="" checked={item.todoStatus === "Completed" ? "checked" : ""} onClick={(e) => handleIsChecked(e, item)}/>
                        </td>
                        <td>{item.todoTitle}</td>
                        <td>{item.todoDescription}</td>
                        <td>{item.todoStatus}</td>
                        <td>{item.todoDueDate}</td>
                        <td>{item.todoPriority}</td>
                        <td>{item.todoBucketName}</td>
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
