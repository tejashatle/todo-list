import react from 'react';
import Bucket from './Bucket';

export default function Modal({ buckets, setBuckets, showModal, setShowModal, dispatch }){
    if (!showModal) return null;

    return(
        <>
        <div className="modal show" tabIndex="-1" style={{display: 'block'}}>
        <div className="modal-dialog modal-lg">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Buckets Management</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <Bucket buckets={buckets} setBuckets={setBuckets} setShowModal={setShowModal} dispatch={dispatch}/>

                
            </div>
           
            </div>
        </div>
        </div>
        <div className="modal-backdrop show" onClick={() => setShowModal(false)}></div>
        </>
    );
}