import react, {useState, useEffect} from 'react';

export default function Bucket({ buckets, setBuckets, setShowModal, dispatch }){

    const [bucketName, setBucketName] = useState('');
    const [bucketDesc, setBucketDesc] = useState('');
    const [category, setCategory] = useState('');

    const submitForm = (e) => {
        e.preventDefault();

        const newBucket = {
            bucketName: bucketName,
            bucketDescription: bucketDesc,
            bucketCategory: category
        };
        // setBuckets(
        //     prev => [...prev, {
        //         bucketName: bucketName,
        //         bucketDesc: bucketDesc,
        //         category: category
        //     }]
        // )
        dispatch({
            type: "ADD_BUCKET",
            payload: newBucket
        })
        setShowModal(false)
        clearForm();
        console.log(buckets);
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

            <h2 className='my-4'>Bucket</h2>

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
                            <option value="bug">Bug</option>
                            <option value="deployment">Deployment</option>
                            <option value="testing">Testing</option>
                        </select>
                    </div>
                </div>
                
                 <div className="col-1">
                    <button type="submit" className="btn btn-primary" >Submit</button>
                </div>
            </form>
        </div>
    );
}