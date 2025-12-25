import react from 'react';

export default function TodoCard({ todo, dispatch }){

    const handleEdit = (e) =>{
        dispatch({
            type: "SET_EDITING_TODO",
            payload: todo
        })
    }   

    const handleDelete = (e) => {
        dispatch({ type: "DELETE_TODO", payload: todo });
        dispatch({ type: "CANCEL_EDITING_TODO"});
    }
    return(
        <div>
            <h5>{todo.todoTitle}</h5>
            <p>{todo.todoDescription}</p>
            <small>Status: {todo.todoStatus}, Priority: {todo.todoPriority}, Due: {todo.todoDueDate}, Bucket: {todo.todoBucket}</small>

 {/* */}
            <button type="submit" className="btn btn-outline-primary btn-sm m-2 px-4" onClick={(e) => handleEdit(e)} >Edit</button>
            <button type="submit" className="btn btn-outline-danger btn-sm px-4" onClick={(e) => handleDelete(e)} >Delete</button>
        </div>
    )
}