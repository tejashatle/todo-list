import {useState, useEffect} from 'react';
import BucketList from './BucketList';

export default function Bucket({ buckets, setShowModal, dispatch, editingBucket, showModal }){

    const [bucketName, setBucketName] = useState('');
    const [bucketDesc, setBucketDesc] = useState('');
    const [category, setCategory] = useState('');

    const submitForm = (e) => {
        e.preventDefault();

        const newBucket = {
            id: editingBucket ? editingBucket.id : Date.now(),
            bucketName: bucketName,
            bucketDescription: bucketDesc,
            bucketCategory: category
        };

        if (editingBucket) {
            dispatch({
                type: "UPDATE_BUCKET",
                payload: newBucket
            });
            //dispatch({ type: "CANCEL_EDITING_BUCKET" });
        } else {
            dispatch({
                type: "ADD_BUCKET",
                payload: newBucket
            });
        }

        
        setShowModal(false);
        clearForm();
        dispatch({ type: "SET_EDITING_BUCKET", payload: null });
    }

    useEffect(() => {
            if (editingBucket) {
                setBucketName(editingBucket.bucketName);
                setBucketDesc(editingBucket.bucketDescription);
                setCategory(editingBucket.bucketCategory);
            }
        }, [editingBucket]);
    
    const handleCancelEdit = (e) => {
        dispatch({type: "CANCEL_EDITING_BUCKET"})
        clearForm();
    }


    const clearForm = () => {
        setBucketName('');
        setBucketDesc('');
        setCategory('');
    }

    const handleBucketName = (e) =>{
        setBucketName(e.target.value);
    }

    const handleBucketDesc = (e) =>{
        setBucketDesc(e.target.value);
    }

    const handleCategory = (e) =>{
        setCategory(e.target.value);
    }

    
    return (
        <div className='container-sm mt-3' width="300px">

            <h2 className='my-4'>{!showModal ? 'Bucket' : '' }</h2>

            <form onSubmit={(e) => submitForm(e)}>
                <div className='row mb-3'>
                    <label className='col-sm-2 col-form-label text-start'>Enter Bucket Name</label>
                    <div className="col-sm-7">
                        <input type='text' value={bucketName} className='form-control form-select-sm' onChange={(e) => handleBucketName(e)}></input>
                    </div>
                </div>

                <div className='row mb-3'>
                    <label className='col-sm-2 col-form-label text-start'>Enter Bucket Description </label>
                    <div className="col-sm-7">
                        <textarea type="text" value={bucketDesc} className='form-control  form-select-sm' onChange={(e) => handleBucketDesc(e)}></textarea>
                    </div>
                </div>
                
                <div className='row mb-3'>
                    <label className='col-sm-2 col-form-label text-start'>Select Categeory</label>
                    <div className="col-sm-7">
                        <select className='form-select  form-select-sm' value={category} onChange={(e) => handleCategory(e)}>
                            <option value="">-- Select Category --</option>
                            <option value="Bug">Bug</option>
                            <option value="Deployment">Deployment</option>
                            <option value="Testing">Testing</option>
                        </select>
                    </div>
                </div>
                
                 <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary" style={{width: '150px'}}>{editingBucket ? "Update Bucket" : "Create Bucket"}</button>

                    { editingBucket && <button type="button" className="btn btn-danger" onClick={(e) => handleCancelEdit(e)}>Cancel Edit</button> }
                </div>
            </form>

            <BucketList buckets={buckets} dispatch={dispatch} showModal={showModal}></BucketList>
        </div>
    );
}