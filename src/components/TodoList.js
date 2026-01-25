import React from "react";
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

    const handleIsChecked = async (e, todo) => {
        if(e.target.checked){
            todo.todoStatus = "Completed";
        }else{
            todo.todoStatus = "In Progress";
        }

        try{
            const response = await todoApiService.updateTodoStatus(todo.todoId, todo.todoStatus);
             dispatch({
                type: "IS_COMPLETED",
                payload: response.data
            })
        }catch(error){
            console.error(error);
        }
       
    }


    function prettifyDateTime(str) {
     const [date] = str.split("T");

    // Assuming 03 is the month and 01 is the day – otherwise, those could be swapped
    const [year, month, day] = date.split("-")

    // Added slashes and the space before the time
    return `${day}/${month}/${year}`
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
                        <td>{prettifyDateTime(item.todoDueDate)}</td>
                        <td>{item.todoPriority}</td>
                        <td>{item.todoBucketName}</td>
                        <td>
                            <button type="submit" className="btn btn-outline-primary btn-sm m-2" onClick={(e) => handleEdit(e, item)} disabled={item.todoStatus === "Completed" ? true : false} >Edit</button>
                            <button type="submit" className="btn btn-outline-danger btn-sm" onClick={(e) => handleDelete(e, item)} disabled={item.todoStatus === "Completed" ? true : false} >Delete</button>
                        </td>
                    </tr>
                ))
            }
            
                </tbody>
            </table>
        </div>
    )
}
