import {useState, useEffect} from 'react';
import BucketList from './BucketList';
import { bucketApiService } from '../services/bucketApi';

export default function Bucket({ buckets, setShowModal, dispatch, editingBucket, showModal }){

    const [bucketName, setBucketName] = useState('');
    const [bucketDesc, setBucketDesc] = useState('');
    const [category, setCategory] = useState('');
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);



    const submitForm = async (e) => {
        e.preventDefault();

        const newBucket = {
            id: editingBucket ? editingBucket.bucketId : '',
            bucketName: bucketName,
            bucketDescription: bucketDesc,
            category: category
        };

        if (editingBucket) {
            try{
                const response = await bucketApiService.updateBucket(newBucket.id, newBucket);
                dispatch({
                    type: "UPDATE_BUCKET",
                    payload: response.data
                });
            } catch(error){
                console.error('Failed to update bucket:', error);
            }
            
        } else {
            try {
                const response = await bucketApiService.createBucket(newBucket);
                dispatch({
                    type: "ADD_BUCKET",
                    payload: response.data
                });
            } catch (error) {
                console.error('Failed to create bucket:', error);
            }
        }

        setShowModal(false);
        clearForm();
        dispatch({ type: "SET_EDITING_BUCKET", payload: null });
    }

    useEffect(() => {
            if (editingBucket) {
                setBucketName(editingBucket.bucketName);
                setBucketDesc(editingBucket.bucketDescription);
                setCategory(editingBucket.category || '');
            }
        }, [editingBucket]);
    
    // Handle category input and filter suggestions
    const handleCategoryChange = (e) => {
        const inputValue = e.target.value;
        setCategory(inputValue);

        if (inputValue.trim() === '') {
            setFilteredCategories([]);
            setShowSuggestions(false);
        } else {
            // Get unique categories from buckets
            const uniqueCategories = [...new Set(buckets.map(b => b.category).filter(c => c))];
            
            // Filter categories based on input
            const filtered = uniqueCategories.filter(cat =>
                cat.toLowerCase().includes(inputValue.toLowerCase())
            );
            
            setFilteredCategories(filtered);
            setShowSuggestions(filtered.length > 0);
        }
    };

    // Handle selecting a suggestion
    const handleSelectCategory = (selectedCat) => {
        setCategory(selectedCat);
        setShowSuggestions(false);
        setFilteredCategories([]);
    };
    
    const handleCancelEdit = (e) => {
        dispatch({type: "CANCEL_EDITING_BUCKET"})
        clearForm();
    }


    const clearForm = () => {
        setBucketName('');
        setBucketDesc('');
        setCategory('');
        setFilteredCategories([]);
        setShowSuggestions(false);
    }

    const handleBucketName = (e) =>{
        setBucketName(e.target.value);
    }

    const handleBucketDesc = (e) =>{
        setBucketDesc(e.target.value);
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
                    <label className='col-sm-2 col-form-label text-start'>Select Category</label>
                    <div className="col-sm-7" style={{ position: 'relative' }}>
                        <input 
                            type='text'
                            className='form-control form-select-sm'
                            placeholder='Type to search or add category...'
                            value={category}
                            onChange={handleCategoryChange}
                            onFocus={() => category && setShowSuggestions(true)}
                            onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
                            autoComplete='off'
                        />
                        
                        {showSuggestions && filteredCategories.length > 0 && (
                            <div 
                                style={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: 0,
                                    right: 0,
                                    backgroundColor: '#fff',
                                    border: '1px solid #ddd',
                                    borderTop: 'none',
                                    maxHeight: '200px',
                                    overflowY: 'auto',
                                    zIndex: 1000,
                                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                                }}
                            >
                                {filteredCategories.map((cat, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleSelectCategory(cat)}
                                        style={{
                                            padding: '10px 12px',
                                            cursor: 'pointer',
                                            backgroundColor: category === cat ? '#e7f3ff' : '#fff',
                                            borderBottom: '1px solid #f0f0f0',
                                            transition: 'background-color 0.2s'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.backgroundColor = '#e7f3ff';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.backgroundColor = category === cat ? '#e7f3ff' : '#fff';
                                        }}
                                    >
                                        {cat}
                                    </div>
                                ))}
                            </div>
                        )}
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