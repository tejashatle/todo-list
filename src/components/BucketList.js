import React from "react";
import { bucketApiService } from "../services/bucketApi";
export default function BucketList({ buckets, dispatch, showModal}){

   

    if (showModal) return null;

    const handleEdit = (e, bucket) =>{
        dispatch({
            type: "SET_EDITING_BUCKET",
            payload: bucket
        })
    }   

    const handleDelete = async (e, bucket) => {

        try {
                const response = await bucketApiService.deleteBucket(bucket.bucketId);
                console.log(response);
                dispatch({
                    type: "DELETE_BUCKET",
                    payload: bucket.bucketId
                });
            } catch (error) {
                console.error('Failed to delete bucket:', error);
            }

        dispatch({ type: "DELETE_BUCKET", payload: bucket.id });
        dispatch({type: "CANCEL_EDITING_BUCKET"})
    }

   

    return (
        <div className="container mt-4">

            <table className="table">
                <thead className="table-light">
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                    <tbody className="table-group-divider">

                 
                        {
                            buckets.map((item, index) => (
                                <tr>
                                    <td>{item.bucketName}</td>
                                    <td>{item.bucketDescription}</td>
                                    <td>{item.category}</td>
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
    );
}