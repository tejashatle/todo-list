import React from "react";

export default function BucketCard({bucket, dispatch}){

    const handleEdit = (e) =>{
        dispatch({
            type: "SET_EDITING_BUCKET",
            payload: bucket
        })
    }   

    const handleDelete = (e) => {
        dispatch({ type: "DELETE_BUCKET", payload: bucket.id });
        dispatch({type: "CANCEL_EDITING_BUCKET"})
    }

    return(
        <div>
            <h5>{bucket.bucketName}</h5>
            <p>{bucket.bucketDescription}</p>
            <small>Category: {bucket.bucketCategory}</small>

            <button type="submit" className="btn btn-outline-primary btn-sm m-2 px-4" onClick={(e) => handleEdit(e)} >Edit</button>
            <button type="submit" className="btn btn-outline-danger btn-sm px-4" onClick={(e) => handleDelete(e)} >Delete</button>
        </div>
    )
}