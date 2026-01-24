import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import { useNavigate } from 'react-router-dom';
import { todoApiService } from '../services/todoApi';

export default function Todo({ todos, buckets, setShowModal, dispatch, editingTodo }){


    const[title, setTitle] = useState("");
    const[description, setDescription] = useState("");
    const[status, setStatus] = useState("Pending");
    const[dueDate, setDueDate] = useState("");
    const[priority, setPriority] = useState("Low");
    const[bucket, setBucket] = useState("");


    const navigate = useNavigate();


    useEffect(() => {
        if (editingTodo) {
            setTitle(editingTodo.todoTitle);
            setDescription(editingTodo.todoDescription);
            setStatus(editingTodo.todoStatus);
            setDueDate(editingTodo.todoDueDate);
            setPriority(editingTodo.todoPriority);
            setBucket(editingTodo.todoBucketId);
        }
    }, [editingTodo]);

    const handleTitle = (e) =>{
        setTitle(e.target.value);
    }

    const handleDescription = (e) =>{
        setDescription(e.target.value);
    }

    const handleStatus = (e) =>{
        setStatus(e.target.value);
    }

    const handleDueDate = (e) =>{
        setDueDate(e.target.value);
    }

    const handlePriority = (e) =>{
        setPriority(e.target.value);
    }

    const handleBucket = (e) => {
        const value = e.target.value;
        if (value === "create") {
            setShowModal(true);
            setBucket(0);
        } else {
            setBucket(Number(value));
        }
    }

    const submitForm = async (e) => {
        e.preventDefault();
        if (bucket === '' || bucket === 0) {
            alert('Please select a bucket');
            return;
        }
        const newTodo = {
            id: editingTodo ? editingTodo.todoId : Date.now(),
            todoTitle: title,
            todoDescription: description,
            todoStatus: status,
            todoDueDate: dueDate,
            todoPriority: priority,
            todoBucketId: parseInt(bucket)
        };
        console.log('Sending todo to backend:', newTodo);
        if (editingTodo) {

            try{
                const response = await todoApiService.updateTodo(newTodo.id, newTodo);
                    dispatch({
                        type: "UPDATE_TODO",
                        payload: response.data
                });
            }catch(error){
                console.error('Failed to update todo:', error);
            }
           // dispatch({ type: "UPDATE_TODO", payload: newTodo });
        } else {

            try {
                const response = await todoApiService.createTodo(newTodo);
                    dispatch({
                        type: "ADD_TODO",
                        payload: response.data
                    });
            } catch (error) {
                    console.error('Failed to create todo:', error);
            }
            //dispatch({ type: "ADD_TODO", payload: newTodo });
        }
        clearForm();
        dispatch({ type: "SET_EDITING_TODO", payload: null });
    }

    const handleCancelEdit = (e) => {
        dispatch({type: "CANCEL_EDITING_TODO"})
    }

    const clearForm = () => {
        setTitle('');
        setDescription('');
        setStatus("Pending");
        setDueDate("");
        setPriority("Low");
        setBucket('');
    }
    

    return(
        <div className='container-sm mt-3' width="300px">

            <h2 className='my-4'>Todo</h2>

            <form onSubmit={(e) => submitForm(e)}>
                <div className='row mb-3'>
                    <label className='col-sm-2 col-form-label text-start'>Enter Title</label>
                    <div className="col-sm-7">
                        <input type='text' value={title} className='form-control form-select-sm' onChange={(e) => handleTitle(e)}></input>
                    </div>
                </div>

                <div className='row mb-3'>
                    <label className='col-sm-2 col-form-label text-start'>Enter Description </label>
                    <div className="col-sm-7">
                        <textarea type="text" value={description} className='form-control  form-select-sm' onChange={(e) => handleDescription(e)}></textarea>
                    </div>
                </div>

                <div className='row mb-3'>
                    <label className='col-sm-2 col-form-label text-start'>Status</label>
                    <div className="col-sm-7">
                        <select className='form-select  form-select-sm' value={status} onChange={(e) => handleStatus(e)}>
                            <option value="">-- Select Status --</option>
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                </div>

                <div className='row mb-3'>
                    <label className='col-sm-2 col-form-label text-start'>Select Due Date</label>
                    <div className="col-sm-7">
                        <input type='date' value={dueDate} className='form-control form-select-sm' onChange={(e) => handleDueDate(e)}></input>
                    </div>
                </div>

                <div className='row mb-3'>
                    <label className='col-sm-2 col-form-label text-start'>Priority</label>
                    <div className="col-sm-7">
                        <select className='form-select  form-select-sm' value={priority} onChange={(e) => handlePriority(e)}>
                            <option value="">-- Select Priority --</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                </div>

                <div className='row mb-3'>
                    <label className='col-sm-2 col-form-label text-start'>Bucket</label>
                    <div className="col-sm-7">
                        <select className='form-select form-select-sm' value={bucket} onChange={(e) => handleBucket(e)}>
                            <option value="">-- Select Bucket --</option>
                            { buckets.length === 0 
                            ? null
                            : buckets.map((item, index) => (
                                <option key={index} value={item.bucketId}>{item.bucketName}</option>
                            ))}
                            <option value="create">Create New Bucket</option>
                        </select>
                    </div>
                </div>

                <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary">{editingTodo ? "Update Todo" : "Add Todo"}</button>

                    { editingTodo && <button type="button" className="btn btn-danger" onClick={(e) => handleCancelEdit(e)}>Cancel Edit</button> }
                </div>

            </form>

              <TodoList todos={todos} dispatch={dispatch} setStatus={setStatus}></TodoList>
        </div>
    )
}